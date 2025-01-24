import { signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";

export default function Logout({ username }: { username: string }) {
    const ex_profile_pic="https://fastly.picsum.photos/id/28/200/200.jpg?hmac=eT-kjSvX_wh2uU3SYgAuRWjzo4ndNGimCCiNEaWlnOg";

  return (
    <div className="flex items-center">
        <p className="mr-2">{`Hello! ${username}`}</p>
      <Link href={"/profile"}>
        <Avatar size="2xl" name={username} src={ ex_profile_pic} />
      </Link>
      <button className="hover:underline m-1" onClick={() => signOut()}>Logout</button>
    </div>
  );
}
