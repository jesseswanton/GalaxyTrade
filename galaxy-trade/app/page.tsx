// Home page which will display ItemCard.tsx component

import { FC } from 'react';
import { FetchItems } from './api/items/fetchItems';
import { AddItem, DeleteItem } from './api/items/addItem';

const Home: FC = () => {
  return (
    <div>
      <h1>Welcome to GalaxyTrade 🌌</h1>
      <p>This is the home page where you can list items available for trade.</p>
    </div>
  );
};

export default Home;



// test functions to test the API calls

async function logOffers() {
  const items = await FetchItems(); // Wait for the promise to resolve

  console.log('Items:', items);

  items.forEach((item, index) => {
    console.log(`Item ${index + 1} Offers:`, item.offers);
  });
}

async function testAddItem() {
  const newItem = {
    title: 'New Item',
    description: 'This is a new item',
    condition: 'New',
    image: 'new-item.jpg',
    owner: 'new-owner',
    tradable: true,
  };

  const createdItem = await AddItem(newItem);
  console.log('Created Item:', createdItem);
}

async function testDeleteItem() {
  try {
    await DeleteItem(10);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}
