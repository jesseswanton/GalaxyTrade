// Home page which will display ItemCard.tsx component

'use client';

import { FC, useEffect, useState } from 'react';
import { Box, SimpleGrid, Skeleton, Heading, Text } from '@chakra-ui/react';
import { ItemCard } from './components/ItemCard';
import { FetchItems } from './api/items/fetchItems';
import { Item } from './types/items';
import { OfferModal } from './components/Modals/makeOfferModal';
import AnimatedPlanet from './components/AnimatedPlanet';
import { useSession } from 'next-auth/react';

async function getItems() {
  const items = await FetchItems();
  return items;
}

const HomePage: FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  //state variables to pass to the make offer modal
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  //get the user session to pass to the make offer modal
  const { data: session } = useSession();
  const user = session?.user;
  
  //handle the make offer click
  const handleMakeOfferClick = (item: Item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  //close the make offer modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getItems().then(setItems);
    setLoading(false);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      bgImage="url('/galaxy-swirl.jpg')"
      bgSize="cover"
      position="center"
      bgRepeat="no-repeat"
      style={{ backgroundPosition: `center ${scrollY * 0.5}px` }}
      minHeight="100vh"
    >

      <Box maxW="1200px" mx="auto" p={6}>
        <Box textAlign="center" mb={6} color="white" p={4} borderRadius="md">
          <Heading as="h1" size="xl">
            Welcome to GalaxyTrade 🌌
          </Heading>
          <Text fontSize="lg">
            Items available for trade.
          </Text>
        </Box>
        <AnimatedPlanet />
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
          {loading
            ? // Show skeletons if loading
            Array(4)
              .fill(0)
              .map((_, index) => (
                <Box key={index}>
                  <Skeleton height="200px" borderRadius="md" />
                  <Skeleton height="20px" mt="4" />
                  <Skeleton height="20px" mt="2" />
                </Box>
              ))
            : // Map over items when they are available
            items.map((item) => (
              <ItemCard key={item.id} item={item} onMakeOfferClick={handleMakeOfferClick} />
            ))}

          {/* Render the modal if it's open */}
          {isModalOpen && selectedItem && (
            <OfferModal item={selectedItem} username={user?.name || null} onClose={handleModalClose} />
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default HomePage;
