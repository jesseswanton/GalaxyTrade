// import { HiOutlinePencilAlt } from "react-icons/hi";
// import { IconButton } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@chakra-ui/react";
import {
  PopoverBody,
  // PopoverArrow,
  PopoverContent,
  PopoverRoot,
  // PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function EditPP({ profilePic }: { profilePic: string }) {
  return (
    <div>
      <PopoverRoot>
        <PopoverTrigger>
          <Avatar
            className="relative overflow-hidden"
            h={56}
            w={56}
            m={3}
            src={profilePic}
          >
          </Avatar>
        </PopoverTrigger>
        <PopoverContent w={200}>
          <PopoverBody>
            {/* <PopoverArrow />
            <PopoverTitle fontWeight="medium">Naruto Form</PopoverTitle> */}
            <Input placeholder="Your fav. character" size="sm" />
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}
