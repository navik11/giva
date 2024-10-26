"use client"
import AuthChecker from "@/components/AuthChecker";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Logout() {

  const router = useRouter();
  let user: any;

  const [username, setUsername] = React.useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined")
      user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : "";
      // console.log(user);
      setUsername(() => user?.user?.username || "guest");
  });

  const goback = () => {
    router.back();
  }

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }

    await axios({
      method: "get",
      url: process.env.NEXT_PUBLIC_SERVER+"/user/logout",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then((res) => {
      console.log(res);
      router.push("/login");
    }).catch((err) => {
      console.log(err);
    });

  }

  return (
    <>
      <AuthChecker children={
        <div className="flex items-center justify-center h-[100vh]">
          <div className="w-50">
            <h4 className="text-6xl font-semibold leading-none">@{username},</h4>
            <p className="text-3xl mt-3 text-muted-foreground underline-offset-4">
              You are logged in, as admin
            </p>
            <div className="flex mt-20 h-5 items-center space-x-4 text-sm">


              <ArrowLeftIcon className="hover:text-gray-500 hover:cursor-pointer" onClick={goback} />

              <span className="hover:text-gray-500 hover:cursor-pointer" onClick={handleLogout}>Logout</span>
            </div>
          </div>
        </div>
      } />
    </>
  );
}