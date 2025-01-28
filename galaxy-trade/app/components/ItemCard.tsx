// Component for displaying item details in the list
import { Button, Card, Image, Text } from "@chakra-ui/react"
import { Item } from '../types/items'


export const ItemCard = (props: Item) => {
  return (
    <Card.Root maxW="sm" overflow="hidden" bg="gray.50" borderRadius="md" boxShadow="md">
      <Image
        src={props.image}
        alt={props.title}
        boxSize="250px"
        objectFit="cover"
        width="100%"
      />
      <Card.Body gap="2" p={4}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Description textStyle="sm" color="gray.600">
          {props.description}
        </Card.Description>
        <Text color="white" textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2" bg="blackAlpha.800" p={2} borderRadius="md">
          Condition: {props.condition}
        </Text>
      </Card.Body>
      <Card.Footer gap="2" p={4}>
        <Button variant="solid">Make Offer</Button>
        <Button variant="ghost">Save</Button>
      </Card.Footer>
    </Card.Root>
  )
}
