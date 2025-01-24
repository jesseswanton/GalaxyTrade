import { db } from '@vercel/postgres'
import { seedItems } from './placeholder-data'

const client = await db.connect()

async function seedDatabase() {
    // await client.sql`CREATE EXTENSION IF NOT EXISTS items`;

    await client.sql`
        CREATE TABLE IF NOT EXISTS items (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            condition VARCHAR(50),
            image VARCHAR(255),
            owner VARCHAR(255) NOT NULL,
            tradable BOOLEAN DEFAULT TRUE
        );
        `;

    const insertedItems = await Promise.all(
        seedItems.map((item) => client.sql`
            INSERT INTO items (title, description, condition, image, owner, tradable)
            VALUES (${item.title}, ${item.description}, ${item.condition}, ${item.image}, ${item.owner}, ${item.tradable})
            ON CONFLICT (id) DO NOTHING
            `,
        ),
    );

    return insertedItems
}

export async function GET() {
    try {
    await client.sql`BEGIN`;
    await seedDatabase();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Seeded ideas successfully' });
    } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
    }
}