import { Stack, Image, Button, Card, } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Offer, Item } from "../types/items";
import { getUserOffers } from "../lib/actions";

export default function Offers({ username }: { username: string }) {
  const [userOffers, setUserOffers] = useState<Offer[] | Item[]>([]);
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  console.log(isLoggedIn, userOffers)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const result = await getUserOffers(username);
        setUserOffers(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOffers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoggedIn && (
        <Stack gap={2} alignItems={"center"} className="inventory-stack">
          {userOffers.map((offer, index) => (
            <Card.Root
              key={index}
              size={"sm"}
              w={"11/12"}
              p={3}
              className="inventory-card"
            >
              <Image
                src={offer.image}
                alt={` picture of${offer.title}`}
                maxH={"200px"}
                maxW={200}
                rounded={"inherit"}
              />
              <Card.Body>
                <Card.Title>{offer.title}</Card.Title>
                <Card.Description>{offer.description}</Card.Description>
              </Card.Body>
              <Card.Footer>
                <Button px={2} variant={"solid"}>
                  Mark Available
                </Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </Stack>
      )}
    </div>
  );
}
