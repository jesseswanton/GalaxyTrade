import { signOut } from "next-auth/react";
// import Link from "next/link";
import { updateUserPic, getProfilePic } from "../lib/actions";
import { Avatar } from "@/components/ui/avatar";
import { Button, Input } from "@chakra-ui/react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
// import EditPP from "../ui/editPP";

export default function Logout({ username }: { username: string }) {

  const placeholderPic =   "https://fastly.picsum.photos/id/28/200/200.jpg?hmac=eT-kjSvX_wh2uU3SYgAuRWjzo4ndNGimCCiNEaWlnOg";


  const [picUrl, setPicUrl] = useState("");
  const [userPic, setUserPic] = useState("")

  console.log(picUrl);

  useEffect(() => {
    async function fetchProfilePic(username: string) {
      const pic = await getProfilePic(username)
      if (pic) {
        setUserPic(pic);
      }
    }
    fetchProfilePic(username)
  },[userPic, username])

  const updatePP = async() => {
    try {
      await updateUserPic(username, picUrl)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex items-center">
      <p className="mx-2">{`Hello! ${username}`}</p>
      <DrawerRoot>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Avatar size="2xl" name={username} src={userPic || placeholderPic} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerCloseTrigger />
          <DrawerHeader>
            <DrawerTitle m={3}>{`${username}'s Profile`}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Avatar
              className="relative overflow-hidden"
              h={56}
              w={56}
              m={3}
              src={userPic || placeholderPic}
            ></Avatar>
            <Input
              name="new-proflie-pic"
              className="w-4/5 m-3 p-3"
              onChange={(e) => setPicUrl(e.currentTarget.value)}
            />
            <Button className="p-3" m={3} onClick={() => updatePP()}>
              Submit
            </Button>
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
