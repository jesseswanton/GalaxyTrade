// Adding items to inventory
import { Item } from '../../types/items';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function AddItem(Item: Omit<Item, 'id' | 'offers'>): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/items/itemRoutes`, {
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
        const response = await fetch(`${API_BASE_URL}/api/items/itemRoutes`, {
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

export async function UpdateItem(Item: Item): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/items/itemRoutes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Item),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const updatedItem = await response.json();
        console.log('Item updated:', updatedItem);

        return updatedItem;

    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}


