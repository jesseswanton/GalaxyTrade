import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server';

import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  origin: '*', // Change to 'https://galaxy-trade.vercel.app' if you want to restrict access
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Helper function to run middleware in Next.js
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: (req: NextApiRequest, res: NextApiResponse, callback: (result: unknown) => void) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await runMiddleware(req, res, cors);

    if (req.method === 'GET') {
      return res.status(200).json({ message: 'CORS enabled!' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  }
}



export async function GET() {
    const client = await db.connect();

    try {
        const items = await client.sql`
            SELECT 
                items.*, 
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', offers.id,
                            'item_id', offers.item_id,
                            'offerer', offers.offerer,
                            'offeredItemId', offers.offeredItemId,
                            'status', offers.status
                        )
                    ) FILTER (WHERE offers.id IS NOT NULL), '[]'
                ) AS offers
            FROM items
            LEFT JOIN offers ON items.id = offers.item_id
            GROUP BY items.id;
        `;

        // Serialize the offers data into valid JSON strings
        const serializedItems = items.rows.map(item => ({
            ...item,
            offers: item.offers
        }));

        return NextResponse.json(serializedItems);

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

        const itemWithOffers = { ...newItem.rows[0], offers: [] };


        return NextResponse.json(itemWithOffers);
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

export async function PUT(request: Request) {
    const client = await db.connect();
    const { id, title, description, condition, image, owner, tradable } = await request.json();

    try {
        const updatedItem = await client.sql`
            UPDATE items
            SET title = ${title}, description = ${description}, condition = ${condition}, image = ${image}, owner = ${owner}, tradable = ${tradable}
            WHERE id = ${id}
            RETURNING *;
        `;

        return NextResponse.json(updatedItem.rows[0]);
    } catch (error) {
        console.error('Error updating item:', error);
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    } finally {
        client.release();
    }
}