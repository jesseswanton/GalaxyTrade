import { signOut } from "next-auth/react";
import { HiOutlinePlus } from "react-icons/hi";
import { AddItemModal } from "../components/Modals/AddItemModal";
import {getProfilePic } from "../lib/actions";
import { Avatar } from "@/components/ui/avatar";
import {
  Button,
  IconButton,
  Box,
  PopoverTrigger,
  PopoverRoot,
  PopoverContent
} from "@chakra-ui/react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import Inventory from "./InventoryPanel";
import Offers from "./OfferPanel";
import ImageSelector from "../components/ImageSelector";

export default function Logout({ username }: { username: string }) {
  const placeholderPic = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  const [userPic, setUserPic] = useState("");
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProfilePic(username: string) {
      const pic = await getProfilePic(username)
      if (pic) {
        setUserPic(pic);
      }
    }
    fetchProfilePic(username);
  }, [username]);

  const handleAddItemButtonClick = () => {
    setAddItemModalOpen(true);
  };

  return (
    <div className="flex items-center">
      <p className="mx-2">{`${username}`}</p>
      <DrawerRoot size={"md"}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Avatar
            className="hover:cursor-pointer"
            size="2xl"
            name={username}
            src={userPic || placeholderPic}
            />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerCloseTrigger zIndex={100} />
          <DrawerBody>
            {addItemModalOpen && (
              <div>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50" />
                <AddItemModal username={username || null} onClose={() => setAddItemModalOpen(false)} />
              </div>
            )}
            <div className="edit-section">
              <Box bg={"currentBg"} className="sticky top-0 z-10 w-full h-fit p-3 flex items-center">
                <DrawerTitle className="my-[6px]">{`${username}'s Profile`}</DrawerTitle>
              </Box>

              <PopoverRoot>
                <PopoverTrigger>
                  <Avatar
                    className="relative overflow-hidden hover:cursor-pointer"
                    h={56}
                    w={56}
                    m={3}
                    src={userPic || placeholderPic}
                  />
                </PopoverTrigger>
                <PopoverContent p={4} borderRadius="md" boxShadow="lg" width="auto" minWidth="300px">
                  <ImageSelector setUserPic={setUserPic} />
                </PopoverContent>
              </PopoverRoot>

            </div>
            <Box bg={"currentBg"} className="sticky top-0 z-10 w-full h-fit p-3 flex items-center mb-3">
              <DrawerTitle>
                Inventory
                <IconButton p={3} className="mx-3 hover:cursor-pointer active:scale-[.95]" onClick={handleAddItemButtonClick}>
                  Add Item
                  <HiOutlinePlus/>
                </IconButton>
              </DrawerTitle>
            </Box>
            <Inventory username={username} />
            <DrawerTitle className="sticky top-0 z-10 w-full h-fit p-3 drop-shadow-md">
              Offers
            </DrawerTitle>
            <Offers username={username} />
          </DrawerBody>
          <DrawerFooter />
          <Button className="m-3 p-2 active:scale-95" onClick={() => signOut()}>
            Sign Out
          </Button>
        </DrawerContent>
      </DrawerRoot>
    </div>
  );
}
