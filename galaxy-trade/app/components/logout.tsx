import { signOut } from "next-auth/react";
// import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@chakra-ui/react";
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
import EditPP from "../ui/editPP";


export default function Logout({ username }: { username: string }) {
  const ex_profile_pic =
    "https://fastly.picsum.photos/id/28/200/200.jpg?hmac=eT-kjSvX_wh2uU3SYgAuRWjzo4ndNGimCCiNEaWlnOg";

  return (
    <div className="flex items-center">
      <p className="mx-2">{`Hello! ${username}`}</p>
      <DrawerRoot>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Avatar size="2xl" name={username} src={ex_profile_pic} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerCloseTrigger />
          <DrawerHeader>
            <DrawerTitle m={3}>{`${username}'s Profile`}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <EditPP profilePic={ex_profile_pic}/>
          </DrawerBody>
          <DrawerFooter />
            <Button className="m-3 p-2" onClick={() => signOut()}>Sign Out</Button>
        </DrawerContent>
      </DrawerRoot>
    </div>
  );
}
