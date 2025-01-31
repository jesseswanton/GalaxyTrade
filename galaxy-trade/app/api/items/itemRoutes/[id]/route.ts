import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const client = await db.connect();
    const itemId = parseInt(params.id, 10)

    if (isNaN(itemId)) {
        return NextResponse.json({ error: "invalid item ID"}, { status: 400 });
    }

    try {
        const itemResult = await client.sql`
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
            WHERE items.id = ${itemId}
            GROUP BY items.id;
        `;

        if (itemResult.rows.length === 0) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        const item = itemResult.rows[0];

        return NextResponse.json({
            ...item,
            offers: item.offers
        });

    } catch (error) {
        console.error("Error fetching item:", error);
        return NextResponse.json({ error: "Failed to fetch item"}, { status: 500 })
    } finally {
        client.release();
    }
}