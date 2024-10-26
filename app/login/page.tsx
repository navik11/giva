"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import axios from "axios"
import { set } from "date-fns"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter();

  const [msg, setMsg] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [btnState, setBtnState] = React.useState<string>("");
  const [btnText, setBtnText] = React.useState<string>("Log in");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(() => "");
    setIsLoading(() => true);
    const formData = new FormData(e.target as HTMLFormElement);

    await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_SERVER + "/user/login",
      data: formData,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json"
      }
    }).then((res) => {
      console.log(res);
      if (typeof window !== "undefined") {
        const storageData = JSON.stringify({
          user: res.data?.data?.user,
          token: res.data?.data?.accessToken,
        });
        localStorage.setItem("user", storageData);
      }
      router.push("/");
    }).catch((err) => {
      console.log(err);
      setMsg(() => { return err?.response?.data?.messege || "Something went wrong" });
    });

    setIsLoading(() => false);
  }

  React.useEffect(() => {
    if (isLoading) {
      setBtnText(() => "Loading...");
    } else {
      setBtnText(() => "Log in");
    }
  }, [isLoading]);

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Giva Log-in </CardTitle>
          <CardDescription>Please enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Email or Username</Label>
                <Input id="username" name="username" required placeholder="sachida" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required placeholder="pass" />
              </div>
            </div>
            <div className="text-xs mt-5 items-center justify-center w-full flex">
              New here?
              <span className="mx-2 text-gray-800 underline underline-offset-4 hover:text-gray-500 hover:cursor-pointer">Sign up</span> or
              <span className="ms-2 text-gray-800 underline underline-offset-4 hover:text-gray-500 hover:cursor-pointer">Forgot password</span>
            </div>
            <div className="text-xs my-5 items-center justify-center w-full flex text-red-400">
              {msg}
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>{btnText}</Button>
          </form>
        </CardContent>
      </Card>
    </div >
  );
}