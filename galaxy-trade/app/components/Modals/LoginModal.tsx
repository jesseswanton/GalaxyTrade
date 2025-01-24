// Login modal component
'use client'
import { Input, Stack, Card, Button, Box } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Alert } from "@/components/ui/alert";

export default function LoginModal() {
  const [alert, setAlert] = useState("");
  const [logIn, setLogIn] = useState(true);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const contact = formData.get("contact");
    const password = formData.get("password");
    const passwordConfirm = formData.get("password-confirm");

    if (password !== passwordConfirm) {
      setAlert("Passwords must match");
      return;
    }

    if (!username || !contact || !password || !passwordConfirm) {
      setAlert("Please fill in all fields");
      return;
    }

    await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: name,
        password: password,
        contact: contact,
      }),
    });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        callbackUrl: "/",
        redirect: false,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {logIn ? (
        <form onSubmit={handleLogin}>
          <Card.Root flex={1} minHeight={"fit-content"} rounded={0}>
            <Card.Header>
              <Card.Title>Sign Up</Card.Title>
              <Card.Description>
                Fill in the form below to create an account!
              </Card.Description>
            </Card.Header>
            <Card.Body h={"50%"} flex={0}>
              <Stack>
                <Input outline={"solid"} p={3} type="text" name="username" />
                <PasswordInput
                  outline={"solid"}
                  p={3}
                  type="text"
                  name="password"
                />
              </Stack>
            </Card.Body>
            <Card.Footer>
              <Link href={"/"}>
                <Button variant={"outline"}>Cancel</Button>
              </Link>
              <Button variant={"solid"} type="submit">
                Log In
              </Button>
            </Card.Footer>
            <Alert>{alert}</Alert>
            <Box p={3} rounded={2} className="w-full sm:w-fit">
              <p>
                Dont have an account?{" "}
                <button
                  className="hover:underline"
                  onClick={() => setLogIn(false)}
                >
                  Click here to create an account
                </button>
              </p>
            </Box>
          </Card.Root>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <Card.Root flex={1} minHeight={"fit-content"} rounded={0}>
            <Card.Header>
              <Card.Title>Sign Up</Card.Title>
              <Card.Description>
                Fill in the form below to create an account!
              </Card.Description>
            </Card.Header>
            <Card.Body h={"50%"} flex={0}>
              <Stack>
                <Input outline={"solid"} p={3} type="text" name="username" />
                <Input outline={"solid"} p={3} type="text" name="contact" />
                <Input outline={"solid"} p={3} type="text" name="password" />
                <Input
                  outline={"solid"}
                  p={3}
                  type="text"
                  name="password-confirm"
                />
              </Stack>
            </Card.Body>
            <Card.Footer>
              <Link href={"/"}>
                <Button variant={"outline"}>Cancel</Button>
              </Link>
              <Button variant={"solid"} type="submit">
                Log In
              </Button>
            </Card.Footer>
            <Alert>{alert}</Alert>
            <Box className="w-full sm:w-fit" p={3} rounded={2}>
              <p>
                Have an account?{" "}
                <Button
                  className="hover:underline"
                  type="button"
                  onClick={() => setLogIn(true)}
                >
                  Click here to log in
                </Button>
              </p>
            </Box>
          </Card.Root>
        </form>
      )}
    </>
  );
}
