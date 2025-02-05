// Home page which will display ItemCard.tsx component

"use client";

import { FC, useEffect, useState } from "react";
import { Box, SimpleGrid, Skeleton, Heading } from "@chakra-ui/react";
import { ItemCard } from "./components/ItemCard";
import { FetchItems } from "./api/items/fetchItems";
import { Item } from "./types/items";
import OfferModal from "./components/Modals/makeOfferModal";
import { DetailsModal } from "./components/Modals/ItemDetailsModal";
import AnimatedPlanet from "./components/AnimatedPlanet";
import { useSession } from "next-auth/react";
// import { set } from 'zod';

async function getItems() {
  const items = await FetchItems();
  return items;
}

const HomePage: FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

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

  const [ItemDetails, setItemDetails] = useState<Item | null>(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

  //handle the details click
  const handleDetailsClick = (item: Item) => {
    setItemDetails(item);
    setDetailsModalOpen(true);
  };

  //close the make offer modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // getItems().then(setItems);
    // setLoading(false);

    const fetchItems = async () => {
      const fetchedItems = await getItems();
      setItems(fetchedItems);
      setLoading(false);
    };
    fetchItems();

  }, []);

  return (
    <Box>
      {/* Render the modal if it's open */}
      {isModalOpen && selectedItem && (
        <OfferModal
          item={selectedItem}
          username={user?.name}
          onClose={handleModalClose}
        />
      )}
      {isDetailsModalOpen && ItemDetails && (
        <DetailsModal
          item={ItemDetails}
          onClose={() => setDetailsModalOpen(false)}
        />
      )}
      <Box maxW="1200px" mx="auto" p={6}>
        <Box textAlign="center" mb={6} color="white" p={4} borderRadius="md">
          <Heading as="h1" size="xl">
          Find the best items in the galaxy
          </Heading>
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
            items
              .filter((item) => item.tradable)
              .map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onMakeOfferClick={handleMakeOfferClick}
                  onDetailsClick={handleDetailsClick}
                />
              ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default HomePage;
