// Sliding inventory panel component
import { Stack, Card, Image, Button } from "@chakra-ui/react";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiDotsHorizontal } from "react-icons/hi";
import { markAvailable, getUserItems, deleteItem } from "../lib/actions";
import { useState, useEffect } from "react";
import { Item } from "../types/items";
import { useSession } from "next-auth/react";

export default function Inventory({ username }: { username: string }) {
  const [userInventory, setUserInventory] = useState<Item[]>([]);

  const { data: session } = useSession();
  const isLoggedIn = !!session;

  // console.log(userInventory);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const userItems = await getUserItems(username);
        setUserInventory(userItems);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: number) => {
    console.log(`the passed id = ${id}`)
    deleteItem(id)
    setUserInventory((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div>
      {isLoggedIn && (
        <Stack gap={2} alignItems={"center"} className="inventory-stack">
          {userInventory.map((item, index) => (
            <Card.Root
              key={index}
              size={"sm"}
              w={"11/12"}
              p={3}
              className="inventory-card"
            >
              <PopoverRoot lazyMount closeOnInteractOutside={false}>
                <PopoverTrigger asChild>
                  <HiDotsHorizontal
                    size={20}
                    className="rounded-full absolute top-1 right-3 hover:cursor-pointer active:scale-90"
                  />
                </PopoverTrigger>
                <PopoverContent w={125} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                  <PopoverBody>
                    <PopoverTitle mx={2} mt={2}>Edit item</PopoverTitle>
                    <Button size={"sm"} colorPalette={"red"} m={2} p={2} onClick={() => handleDelete(item.id)}>Delete Item</Button>
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
              <Image
                src={item.image}
                alt={` picture of${item.title}`}
                maxH={"200px"}
                maxW={200}
                rounded={"inherit"}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Description>{item.description}</Card.Description>
              </Card.Body>
              <Card.Footer>
                {!item.tradable && (
                  <Button
                    px={2}
                    variant={"solid"}
                    mt={2}
                    onClick={() => markAvailable(item.id)}
                  >
                    Mark Available
                  </Button>
                )}
              </Card.Footer>
            </Card.Root>
          ))}
        </Stack>
      )}{" "}
    </div>
  );
}
