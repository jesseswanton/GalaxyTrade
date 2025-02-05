import { HiMiniUserCircle } from "react-icons/hi2";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
// import { Button } from "@chakra-ui/react";
import LoginModal from "@/app/components/Modals/LoginModal";

export default function Login() {
  return (
    <div>
      <DrawerRoot size={"lg"}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <button className="relative z-10">
            <div className="flex items-center">
              <HiMiniUserCircle
                className="hover:cursor-pointer active:scale-90 size-16" 
              />
              <p className="hidden md:block hover:cursor-pointer hover:underline">Login/Signup</p>
            </div>
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerBody p={5}>
            <LoginModal />
          </DrawerBody>
          <DrawerFooter>
          </DrawerFooter>
          <DrawerCloseTrigger/>
        </DrawerContent>
      </DrawerRoot>
    </div>
  );
}
