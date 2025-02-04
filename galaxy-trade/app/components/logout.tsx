import { signOut } from "next-auth/react";
import { getProfilePic } from "../lib/actions";
// updateUserPic,
import { Avatar } from "@/components/ui/avatar";
import { Button,
  //  Input 
  } from "@chakra-ui/react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  // DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import Inventory from "./InventoryPanel";
import Offers from "./OfferPanel";
// import EditPP from "../ui/editPP";

export default function Logout({ username }: { username: string }) {

  const placeholderPic =   "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";


  // const [picUrl, setPicUrl] = useState("");
  const [userPic, setUserPic] = useState("")

  // console.log(picUrl);

  useEffect(() => {
    async function fetchProfilePic(username: string) {
      const pic = await getProfilePic(username)
      if (pic) {
        setUserPic(pic);
      }
    }
    fetchProfilePic(username)
  },[
    // userPic, 
    username])

  // const updatePP = async() => {
  //   try {
  //     await updateUserPic(username, picUrl)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const handleImageUpload = async (publicId: string) => {
  //   try {
  //     await updateUserPic(username, publicId);
  //     setUserPic(publicId);
  //   } catch (error) {
  //     console.error("Failed to update profile picture:", error);
  //   }
  // };

  return (
    <div className="flex items-center">
      <p className="mx-2">{`Greetings ${username}`}</p>
      <DrawerRoot size={"md"}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Avatar className="hover:cursor-pointer" size="2xl" name={username} src={userPic || placeholderPic} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerCloseTrigger zIndex={100} />
          {/* <DrawerHeader> */}
          {/* </DrawerHeader> */}
          <DrawerBody>
            <div className="edit-sectionm">
              <DrawerTitle className="sticky top-0 z-10 w-full h-fit p-3 drop-shadow-md">{`${username}'s Profile`}</DrawerTitle>
              <Avatar
                className="relative overflow-hidden"
                h={56}
                w={56}
                m={3}
                src={userPic || placeholderPic}
              ></Avatar>

              {/* <Input
                name="new-proflie-pic"
                className="w-4/5 m-3 p-3"
                onChange={(e) => setPicUrl(e.currentTarget.value)}
              />
              <Button className="p-3" m={3} onClick={() => updatePP()}>
                Submit
              </Button> */}

            </div>
            <DrawerTitle className="sticky top-0 z-10 w-full h-fit p-3 drop-shadow-md">Inventory</DrawerTitle>
            <Inventory username={username}/>
            <DrawerTitle className="sticky top-0 z-10 w-full h-fit p-3 drop-shadow-md">Offers</DrawerTitle>
            <Offers username={username} />
          </DrawerBody>
          <DrawerFooter />
          <Button className="m-3 p-2" onClick={() => signOut()}>
            Sign Out
          </Button>
        </DrawerContent>
      </DrawerRoot>
    </div>
  );
}
