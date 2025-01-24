import z from "zod";
import { NextResponse } from "next/server";
import { addUser } from "@/app/lib/actions";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const validCredentials = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    if (!validCredentials) {
      return NextResponse.json("", { status: 400 });
    }
    await addUser(name, email, password);
    console.log({ name, email, password })
    return NextResponse.json({message: "success"})
  } catch (error) {
    console.error(error);
  }
}
