// Fetching items from an API
import { Item } from '../../types/items';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function FetchItems(): Promise<Item[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/items/itemRoutes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
    //   console.log('items', data);

      return data;

    } catch (error) {
      console.error('Error fetching items:', error);
        return [];
      }
  }