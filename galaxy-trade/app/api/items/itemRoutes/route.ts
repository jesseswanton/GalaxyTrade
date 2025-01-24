import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server';


export async function GET() {
    const client = await db.connect();

    try {
        const items = await client.sql`SELECT * FROM items`;
        return NextResponse.json(items.rows);
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    } finally {
        client.release();
    }
}

export async function POST(request: Request) {
    
    const client = await db.connect();
    const { title, description, condition, image, owner, tradable } = await request.json();

    try {
        const newItem = await client.sql`
            INSERT INTO items (title, description, condition, image, owner, tradable)
            VALUES (${title}, ${description}, ${condition}, ${image}, ${owner}, ${tradable})
            RETURNING *;
        `;
        return NextResponse.json(newItem);
    } catch (error) {
        console.error('Error adding item:', error);
        return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
    } finally {
        client.release();
    }
}

export async function DELETE(request: Request) {
    const client = await db.connect();
    const { id } = await request.json();
    
    try {
        await client.sql`
            DELETE FROM items WHERE id = ${id};
        `;
        return NextResponse.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    } finally {
        client.release();
    }
}