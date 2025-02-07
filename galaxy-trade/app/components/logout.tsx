import { signOut } from "next-auth/react";
import { HiOutlinePlus } from "react-icons/hi";
import { AddItemModal } from "../components/Modals/AddItemModal";
import {updateUserPic, getProfilePic } from "../lib/actions";
import { Avatar } from "@/components/ui/avatar";
import {
  Button,
  IconButton,
  Box,
  PopoverTrigger,
  PopoverRoot,
  PopoverContent,
  Input
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
// import EditPP from "../ui/editPP";
import PendingOffers from "./PendingOffers";
import ImageSelector from "../components/ImageSelector";
import { HiOutlineMenu } from "react-icons/hi";

export default function Logout({ username }: { username: string }) {
  const placeholderPic = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

  const [userPic, setUserPic] = useState("");
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    async function fetchProfilePic(username: string) {
      const pic = await getProfilePic(username)
      if (pic) {
        setUserPic(pic);
      }
    }
    fetchProfilePic(username);
  }, [username]);

  const updatePP = async () => {
    try {
      if (!userPic) {
        console.error("No image URL provided");
        return;
      }
      await updateUserPic(username, userPic);
      console.log("Profile picture updated!");
    } catch (error) {
      console.error("Failed to update profile picture:", error);
    }
  };

  const handleAddItemButtonClick = () => {
    setAddItemModalOpen(true);
  };

  return (
    <div className="flex items-center">
      <p className="mx-2 hidden md:block">{`${username}  `}</p>
      <DrawerRoot size={"md"}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          {size.width < 768 ? (
            <IconButton rounded={"full"}><HiOutlineMenu /></IconButton>
          ): (
            <Avatar
            className="hover:cursor-pointer"
            size="2xl"
            name={username}
            src={userPic || placeholderPic}
          />
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerCloseTrigger zIndex={100} />
          <DrawerBody>
            {addItemModalOpen && (
              <div>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50" />
                <AddItemModal
                  username={username || null}
                  onClose={() => setAddItemModalOpen(false)}
                />
              </div>
            )}
            <div className="edit-section flex flex-col items-center justify-center w-full">
              <Box bg={"currentBg"} className="sticky top-0 z-10 w-full h-fit p-3 flex items-center">
                <DrawerTitle className="my-[6px]">{`${username}'s Profile`}</DrawerTitle>
              </Box>

              <PopoverRoot open={popoverOpen} onOpenChange={(e) => setPopoverOpen(e.open)}>
                  <Avatar
                    className="relative overflow-hidden hover:cursor-pointer"
                    h={56}
                    w={56}
                    m={3}
                    src={userPic || placeholderPic}
                  />
                <Box display="flex" alignItems="center" justifyContent="center" gap={2} mt={1}>
                  <PopoverTrigger>
                    <div className="mx-3 hover:cursor-pointer active:scale-[.95] ] flex items-center justify-center p-2.5 rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-all">
                        Open Image Library
                    </div>
                  </PopoverTrigger>

                  <Button className="p-3" m={3} onClick={() => updatePP()}>
                    Save Avater
                  </Button>
                </Box>
                <PopoverContent p={4} borderRadius="md" boxShadow="lg" width="auto" minWidth="300px">
                  <ImageSelector setUserPic={(url) => {
                    setUserPic(url);
                    setPopoverOpen(false);
                  }} />
                </PopoverContent>
              </PopoverRoot>

              <Input
                name="new-proflie-pic"
                className="w-4/5 m-3 p-3"
                placeholder="Enter image URL for avatar or open image library"
                value={userPic}
                onChange={(e) => setUserPic(e.currentTarget.value)}
              />

            </div>
            <div>
              <Box
                bg={"currentBg"}
                className="sticky top-0 z-10 w-full h-fit p-3 flex items-center "
              >
                <DrawerTitle>
                  Inventory
                  <IconButton
                    p={3}
                    className="mx-3 hover:cursor-pointer active:scale-[.95]"
                    onClick={handleAddItemButtonClick}
                  >
                    Add Item
                    <HiOutlinePlus />
                  </IconButton>
                </DrawerTitle>
              </Box>
              <Inventory username={username} />
            </div>
            <div>
              <Box
                bg={"currentBg"}
                className="sticky top-0 z-10 w-full h-fit p-3 flex items-center "
              >
                <DrawerTitle className="sticky top-0 z-10 w-full h-fit p-3 drop-shadow-md">
                  Offers
                </DrawerTitle>
              </Box>
              <Offers username={username} />
            </div>
            <div>
              <Box
                bg={"currentBg"}
                className="sticky top-0 z-10 w-full h-fit p-3 flex items-center "
              >
                <DrawerTitle className="sticky top-0 z-10 w-full h-fit p-3 drop-shadow-md">
                  Your Offers
                </DrawerTitle>
              </Box>
              <PendingOffers username={username} />
            </div>
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
