// Component for displaying item details in the list
import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Item } from "../types/items";
import "../styles/globals.css";

interface ItemCardProps {
  item: Item; // The individual item data
  onMakeOfferClick: (item: Item) => void; // The function to handle offer click
  onDetailsClick: (item: Item) => void; // The function to handle details click
}

export const ItemCard = ({
  item,
  onMakeOfferClick,
  onDetailsClick,
}: ItemCardProps) => {
  return (
    <Card.Root
      overflow="hidden"
      bg="gray.400"
      borderRadius="md"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      minH={"fit-content"}
      className="hover:scale-105 transition-transform hover:shadow-[0px 0px 20px Yellow]"
    >
      <Image
        src={item.image}
        alt={item.title}
        boxSize="250px"
        objectFit="cover"
        width="100%"
      />
      <Card.Body
        display="flex"
        flexDirection="column"
        flex="1"
        p={4}
        style={{
          backgroundImage: "url('/stars.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Card.Title textStyle="2x1" color="white" pb={2}>
          {item.title}
        </Card.Title>
        <Card.Description
          textStyle="sm"
          color="white"
          borderRadius="md"
          scrollbar={'hidden'}
          overflow={"auto"}
          className="line-clamp-5"
        >
          {item.description}
        </Card.Description>
        <Text
          textStyle="sm"
          fontWeight="medium"
          letterSpacing="tight"
          color="white"
          mt="2"
          bg="blackAlpha.800"
          p={2}
          borderRadius="md"
        >
          Condition: {item.condition}
        </Text>
        <Card.Footer
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
          mt="auto"
          p={4}
          h={""}
        >
          <Button
            variant="plain"
            _hover={{
              scale: "1.1",
              color: "whiteAlpha.950",
              textShadow: "0px 0px 10px Yellow",
              transition: '500ms ease-in-out'
            }}
            style={{transition: "500ms"}}
            _focus={{
              boxShadow: "none",
            }}
            p={4}
            color="white"
            onClick={() => onMakeOfferClick(item)}
          >
            Make Offer
          </Button>
          <Button
            variant="plain"
            _hover={{
              scale: "1.1",
              color: "whiteAlpha.950",
              textShadow: "0px 0px 10px Yellow",
              transition: '500ms ease-in-out'
            }}
            style={{transition: "500ms"}}
            _focus={{
              boxShadow: "none",
            }}
            p={4}
            color={"white"}
            onClick={() => onDetailsClick(item)}
          >
            Details
          </Button>
        </Card.Footer>
      </Card.Body>
    </Card.Root>
  );
};
