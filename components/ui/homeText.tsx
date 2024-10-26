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
    <div className="flex items-center flex-col justify-center h-[100vh] text-center p-4">
      <div className="w-50 items-center flex flex-col">
        <h4 className="text-6xl font-semibold leading-none">Giva</h4>
        <p className="text-2xl mt-5 text-muted-foreground underline-offset-4">
          Authentic <b>Fine Silver</b>, <i>Pure Gold</i> and <u>Diamonds</u>
        </p>
        <div className="flex mt-20 h-5 items-center space-x-4 text-sm text-left">
          <HoverCard>
            <HoverCardTrigger asChild>
              <GitHubLogoIcon className="hover:text-gray-500 hover:cursor-pointer w-5 h-5" />
            </HoverCardTrigger>
            <HoverCardContent className="p-5 rounded-md shadow-md">
              <div className="flex justify-between space-x-4">
                <GitHubLogoIcon className="w-10 h-10 cursor-pointer" />
                <a href="https://github.com/navik11" target="_blank" rel="noopener noreferrer">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@navik11</h4>
                    <p className="text-xs">
                      Giva store – created and maintained by Sachida.
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span className="text-xs ms-2 text-muted-foreground">
                        Joined Oct 2024
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </HoverCardContent>
          </HoverCard>


          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => { router.push("/logout") }}>
                {
                  (avatarUrl != "") ? <img src={avatarUrl} alt="avatar" className="w-5 h-5 rounded-full" /> : <PersonIcon className="hover:text-gray-500 hover:cursor-pointer" />
                }
              </TooltipTrigger>
              <TooltipContent>
                <p>@{username}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => { router.push("/admin") }}>
                <Pencil1Icon className="hover:text-gray-500 hover:cursor-pointer w-5 h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Admin</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>


          <span className="hover:text-gray-500 hover:cursor-pointer" onClick={() => router.push("/collection")}>Collection</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground mt-52 text-center">note: It might take time to respond for the first time<br></br> since, <b>@Render</b> makes web server ideal after 15m of incative time</span>
    </div>
  );
}