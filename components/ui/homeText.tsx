"use client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { CalendarIcon, GitHubLogoIcon, Pencil1Icon, PersonIcon } from "@radix-ui/react-icons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserObj } from "@/type/user";


export function HomeText() {

  const router = useRouter();

  let user: UserObj;

  const [username, setUsername] = useState<string>("guest");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined")
      user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : "";
      // console.log(user);
      setUsername(() => user?.user?.username || "guest");
      setAvatarUrl(() => user?.user?.avatar || "");
  });

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-50">
        <h4 className="text-6xl font-semibold leading-none">Giva,</h4>
        <p className="text-3xl mt-3 text-muted-foreground underline-offset-4">
          Authentic <i>Fine Silver</i>, <i>Pure Gold</i> and <i>Diamonds</i>
        </p>
        <div className="flex mt-20 h-5 items-center space-x-4 text-sm">
          <HoverCard>
            <HoverCardTrigger asChild>
              <GitHubLogoIcon className="hover:text-gray-500 hover:cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent className="p-5 rounded-sm shadow-md bg-gray-50">
              <div className="flex justify-between space-x-4">
                <GitHubLogoIcon className="w-10 h-10" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@navik11</h4>
                  <p className="text-sm">
                    Giva store – created and maintained by Sachida.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon />
                    <span className="text-xs ms-2 text-muted-foreground">
                      Joined Oct 2024
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>


          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => {router.push("/logout")}}>
                {
                  (avatarUrl != "") ? <img src={avatarUrl} alt="avatar" className="w-4 h-4 rounded-full" /> : <PersonIcon className="hover:text-gray-500 hover:cursor-pointer" />
                }
              </TooltipTrigger>
              <TooltipContent>
                <p>@{username}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => {router.push("/admin")}}>
                <Pencil1Icon className="hover:text-gray-500 hover:cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Admin</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>


          <span className="hover:text-gray-500 hover:cursor-pointer">Collection</span>
        </div>
      </div>
    </div>
  );
}