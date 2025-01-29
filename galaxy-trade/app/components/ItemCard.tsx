// Component for displaying item details in the list
import { Button, Card, Image, Text, Box } from "@chakra-ui/react"
import { Item } from '../types/items'


export const ItemCard = (props: Item) => {
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
      <Card.Root maxW="sm" overflow="hidden" bg="gray.400" borderRadius="md" boxShadow="md">
        <Image
          src={props.image}
          alt={props.title}
          boxSize="250px"
          objectFit="cover"
          width="100%"
        />
        <Box
          style={{
            backgroundImage: "url('/stars.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center", // ✅ Center the image
          }}
          aspectRatio="1"
          minHeight="5vh"
        >
          <Card.Body gap="2" p={4}>
            <Card.Title textStyle="2x1" color="white">{props.title}</Card.Title>
            <Card.Description textStyle="sm" color="white" bg="blackAlpha.800" borderRadius="md">
              {props.description}
            </Card.Description>
            <Text
              color="gray.50"
              textStyle="2xl"
              fontWeight="medium"
              letterSpacing="tight"
              mt="2"
              bg="blackAlpha.800"
              p={2}
              borderRadius="md"
            >
              Condition: {props.condition}
            </Text>
          </Card.Body>
          <Card.Footer gap="2" p={4}>
            <Button 
            variant="ghost" 
            _hover={{
              bg: 'gray.400',
              color: 'gray.50',
            }}
            _focus={{
              boxShadow: 'none',
            }}
            color="gray.50"
            >Make Offer</Button>
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
            >Details</Button>
          </Card.Footer>
        </Box>
      </Card.Root>
    </Box>
  )
}
