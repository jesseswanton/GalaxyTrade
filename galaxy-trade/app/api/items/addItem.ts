// Adding items to inventory
import { Item } from '../../types/items';

export async function AddItem(Item: Omit<Item, 'id' | 'offers'>): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/api/items/itemRoutes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Item),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const newItem = await response.json();
        console.log('Item added:', newItem);

        return newItem;

    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
}

export async function DeleteItem(id: number): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/api/items/itemRoutes', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json(); // This just contains the success message
        console.log(result.message); // Logs: "Item deleted successful

    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}


