"use client";

import { useState, useEffect } from 'react';
import CustomModal from './customModal';
import { addItemOffer, getUserItems } from '../../lib/actions'
import { Item } from '../../types/items';
import { Button, Text } from "@chakra-ui/react";

interface ModalProps {
  item: Item;
  username: string;
  onClose: () => void;
}

export const OfferModal: React.FC<ModalProps> = ({ item, username, onClose }) => {
  
  const [offeredItemId, setOfferedItemId] = useState<number>(0);
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchUserItems = async () => {
      try {
        if (username) {
        const items = await getUserItems(username);
        setUserItems(items);
        } else {
          setError('Please log in to make an offer');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserItems();
  }, [username]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (offeredItemId === 0) {
      setError('Please select an item to offer');
      return;
    }

    const offer = await addItemOffer(item.id, username, offeredItemId);

    if (offer) {
      alert('Offer submitted successfully');
      onClose(); // Close modal after submitting
    } else {
      alert('Failed to submit offer');
    }
  }

  return (
    <CustomModal isOpen={true} onClose={onClose} title={`Make an Offer on ${item.title}`}>
      <form onSubmit={handleSubmit}>
        <select
          value={offeredItemId}
          onChange={(e) => setOfferedItemId(Number(e.target.value))}
          style={{
            width: "100%", 
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #CBD5E0", // Chakra's gray.300
            backgroundColor: "white",
            fontSize: "16px",
          }}
        >

          <option value={0}>Select an item</option>
          {userItems.map((userItem) => (
            <option key={userItem.id} value={userItem.id}>{userItem.title}</option>
          ))}
        </select>
        {error && <Text color="red.500">{error}</Text>}
        <Button type="submit" mt="4" colorScheme="blue" borderRadius="md" p={2}>Submit Offer</Button>
      </form>
    </CustomModal>
  );
}

export default OfferModal;
