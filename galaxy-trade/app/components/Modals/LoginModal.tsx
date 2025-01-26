// Login modal component
"use client";
import { Input, Stack, Card, Button } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { FormEvent, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Alert } from "@/components/ui/alert";
import '../../styles/globals.css'

export default function LoginModal() {
  const [alert, setAlert] = useState("");
  const [logIn, setLogIn] = useState(true);

  useEffect(() => {
    setAlert("")
  },[logIn])

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
        username: username,
        password: password,
        contact: contact,
      }),
    });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    console.log(username, password);

    if (!username || !password) {
      setAlert("Please finish the form");
      return;
    }

    try {
      const response = await signIn("credentials", {
        username: username,
        password: password,
        callbackUrl: "/",
        redirect: true,
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
          <Card.Root flex={1} minHeight={"fit-content"} rounded={0} border={0}>
            <Card.Header>
              <Card.Title>Log In</Card.Title>
              <Card.Description my={2}>
                Fill in the form below to Log in!
              </Card.Description>
            </Card.Header>
            <Card.Body h={"50%"} flex={0}>
              <Stack gap={3} mx={1}>
                <h2>Username</h2>
                <Input outline={"solid"} p={3} type="text" name="username" outlineWidth={1}/>
                <h2>Password</h2>
                <PasswordInput
                  outline={"solid"}
                  outlineWidth={1}
                  p={3}
                  type="text"
                  name="password"
                />
              </Stack>
            </Card.Body>
            <Card.Footer justifyContent={"space-between"} mx={1}>
              <div className="text-lg">
                Dont have an account yet?{" "}
                <button
                type="button"
                className="login-toggle"
                onClick={() => setLogIn(false)}
                >Click here to sign up!</button>
              </div>
              <Button variant={"solid"} type="submit" my={3} p={3} size={"md"}>
                Log In 🚀
              </Button>
            </Card.Footer>
            {alert && <Alert w={"1/2"} size={"lg"}>{alert}</Alert>}
          </Card.Root>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <Card.Root flex={1} minHeight={"fit-content"} rounded={0} border={0}>
            <Card.Header>
              <Card.Title>Sign Up</Card.Title>
              <Card.Description my={2}>
                Fill in the form below to create an account!
              </Card.Description>
            </Card.Header>
            <Card.Body h={"50%"} flex={0}>
              <Stack gap={3} mx={1}>
                <h2>Username</h2>
                <Input outline={"solid"} p={3} type="text" name="username" outlineWidth={1}/>
                <h2>Password</h2>
                <PasswordInput
                  outline={"solid"}
                  outlineWidth={1}
                  p={3}
                  type="text"
                  name="password"
                />
                <h2>Confirm password</h2>
                <PasswordInput outline={"solid"} p={3} type="text" name="password-confirm" outlineWidth={1}/>
                <h2>Contact Info</h2>
                <Input outline={"solid"} p={3} type="text" name="contact" outlineWidth={1}/>
              </Stack>
            </Card.Body>
            <Card.Footer justifyContent={"space-between"} mx={1}>
              <div className="text-lg">
                Have an account?{" "}
                <button
                type="button"
                className="login-toggle"
                onClick={() => setLogIn(true)}
                >Click here to Log in!</button>
              </div>
              <Button variant={"solid"} type="submit" my={3} p={3} size={"md"}>
                Sign up 🚀
              </Button>
            </Card.Footer>
            {alert && <Alert w={"1/2"} size={"lg"}>{alert}</Alert>}
          </Card.Root>
        </form>
      )}
    </>
  );
}
