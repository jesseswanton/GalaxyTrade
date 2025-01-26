// Fetching items from an API
import { Item } from '../../types/items';

export async function FetchItems(): Promise<Item[]> {
    try {
      const response = await fetch('http://localhost:3000/api/items/itemRoutes', {
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