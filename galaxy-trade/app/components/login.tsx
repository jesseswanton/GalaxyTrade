import { HiMiniUserCircle } from "react-icons/hi2";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@chakra-ui/react";
import LoginModal from "@/app/components/Modals/LoginModal";

export default function Login() {
  return (
    <div>
      <DrawerRoot>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <div className="flex items-center">
              <HiMiniUserCircle
                className="hover:cursor-pointer active:scale-90"
                size={56}
              />
              <p className="hidden md:block">Login/Signup</p>
            </div>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerBody>
            <LoginModal />
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </div>
  );
}
