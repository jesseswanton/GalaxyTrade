// Component for displaying item details in the list
import { Button, Card, Image, Text, Box } from "@chakra-ui/react"
import { Item } from '../types/items'

interface ItemCardProps {
  item: Item; // The individual item data
  onMakeOfferClick: (item: Item) => void; // The function to handle offer click
  onDetailsClick: (item: Item) => void; // The function to handle details click
}


export const ItemCard = ({item, onMakeOfferClick, onDetailsClick}: ItemCardProps) => {
  return (
    <Box
      maxW="sm"
      overflow="hidden"
      bg="gray.50"
      borderRadius="md"
      boxShadow="md"
      _hover={{
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)', // Glowing effect on hover
        transform: 'scale(1.05)', // Slightly increase size on hover
        cursor: 'pointer', // Change cursor to pointer to indicate it's interactive
      }}
      transition="all 0.3s ease-in-out" // Smooth transition
    >
      <Card.Root
      maxW="sm"
      overflow="hidden"
      bg="gray.400"
      borderRadius="md"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      height="100%">
        <Image
          src={item.image}
          alt={item.title}
          boxSize="250px"
          objectFit="cover"
          width="100%"
        />
        <Box
          style={{
            backgroundImage: "url('/stars.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          aspectRatio=".85"
          minHeight="5vh"
          flex="1"
        >
          <Card.Body display="flex" flexDirection="column" flex="1" p={4}>
            <Card.Title textStyle="2x1" color="white" pb={2}> {item.title} </Card.Title>
            <Card.Description textStyle="sm" color="white" bg="blackAlpha.800" borderRadius="md" p={4}>
              {item.description}
            </Card.Description>
            <Text
              color="gray.50"
              textStyle="sm"
              fontWeight="medium"
              letterSpacing="tight"
              mt="2"
              bg="blackAlpha.800"
              p={2}
              borderRadius="md"
            >
              Condition: {item.condition}
            </Text>

            <Card.Footer display="flex" justifyContent="space-between" mt="auto" p={4}>
                <Button 
                variant="ghost" 
                _hover={{
                  bg: 'gray.400',
                  color: 'gray.50',
                }}
                _focus={{
                  boxShadow: 'none',
                }}
                p={4}
                color="gray.50"
                onClick={() => onMakeOfferClick(item)}
                > Make Offer </Button>

                <Button 
                variant="ghost" 
                color="gray.50"
                _hover={{
                  bg: 'gray.400',
                  color: 'gray.50',
                }}
                _focus={{
                  boxShadow: 'none',
                }}
                p={4}
                onClick={() => onDetailsClick(item)}
                >Details </Button>

            </Card.Footer>
          </Card.Body>
        </Box>
      </Card.Root>
    </Box>
  )
}
