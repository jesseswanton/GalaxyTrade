import { Card, Stack, Image, Button, Tag } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import { OfferItem } from "../types/items";
import { cancelOffer, getPendingOffers } from "../lib/actions";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PendingOffers({ username }: { username: string }) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [PendingOffers, setPendingOffers] = useState<OfferItem[]>([]);

  console.log(PendingOffers);

  useEffect(() => {
    const fetchPendingOffers = async () => {
      try {
        const result = await getPendingOffers(username);
        setPendingOffers(result);
      } catch (error) {
        console.error(error);
        setPendingOffers([]);
      }
    };
    fetchPendingOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = (id: number) => {
    cancelOffer(id);
    setPendingOffers((prev) => prev.filter((item) => item.offer_id !== id));
  };

  return (
    <div className="mb-3">
      {isLoggedIn && (
        <Stack gap={2} alignItems={"center"}>
          {PendingOffers.filter((item) => item.offerer === username).map(
            (item, index) => (
              <Card.Root
                key={index}
                size={"sm"}
                w={"11/12"}
                p={3}
                className="inventory-card"
              >
                <div
                  style={{ display: "flex" }}
                  className="justify-center items-center"
                >
                  <Image
                    minH={100}
                    minW={100}
                    maxH={"200px"}
                    maxW={200}
                    rounded={"md"}
                    src={item.offered_item_image}
                    alt={`Picture of ${item.offered_item_title}`}
                  />
                  <HiOutlineSwitchHorizontal size={50} />
                  <Image
                    minH={100}
                    minW={100}
                    src={item.item_image}
                    alt={` picture of${item.item_title}`}
                    maxH={"200px"}
                    maxW={200}
                    rounded={"md"}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{`your offer of ${item.offered_item_title} for ${item.owner}'s ${item.item_title}`}</Card.Title>
                  <Card.Description>
                    {item.offered_item_description}
                  </Card.Description>
                  <Tag.Root
                    size={"lg"}
                    p={3}
                    colorPalette={
                      item.status === "rejected"
                        ? "red"
                        : item.status === "accepted"
                        ? "green"
                        : "yellow"
                    }
                  >
                    <Tag.Label
                      fontSize={"lg"}
                    >{`status: ${item.status}`}</Tag.Label>
                  </Tag.Root>
                </Card.Body>
                <Card.Footer
                  display={"flex"}
                  justifyContent={"space-around"}
                  mt={2}
                >
                  {item.status === "pending" ? (
                    <PopoverRoot lazyMount closeOnInteractOutside={false}>
                      <PopoverTrigger asChild>
                        <Button colorPalette={"red"} p={2}>
                          Cancel Offer
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        w={"full"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <PopoverBody
                          display={"flex"}
                          flexDirection={"column"}
                          alignItems={"center"}
                        >
                          <PopoverTitle mx={2} mt={2}>
                            Are you sure you want to cancel this offer?
                          </PopoverTitle>
                          <Button
                            size={"md"}
                            colorPalette={"red"}
                            m={2}
                            p={3}
                            w={"11/12"}
                            onClick={() => handleCancel(item.offer_id)}
                          >
                            Cancel
                          </Button>
                        </PopoverBody>
                      </PopoverContent>
                    </PopoverRoot>
                  ) : (
                    <Button p={3} colorPalette={"red"} onClick={() => handleCancel(item.offer_id)}>Dismiss offer</Button>
                  )}
                </Card.Footer>
              </Card.Root>
            )
          )}
        </Stack>
      )}
    </div>
  );
}
