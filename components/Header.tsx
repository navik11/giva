"use client"
import { Pencil1Icon, PersonIcon } from "@radix-ui/react-icons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  let user: any;

  const [username, setUsername] = useState<string>("guest");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined")
      user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : "";
      // console.log(user);
      setUsername(() => user?.user?.username || "guest");
      setAvatarUrl(() => user?.user?.avatar || "");
  });
  return (
    <div className="w-full flex items-center justify-center py-5">
      <div className="w-full flex justify-between items-center">
        <div>
          <b className="text-lg">Giva</b><span className="ms-1 text-base">Admin</span>
        </div>
        <div className="flex h-5 ms-5 items-center space-x-3 text-sm">
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => {router.push("/logout")}}>
                {
                  (avatarUrl != "") ? <img src={avatarUrl} alt="avatar" className="w-5 h-5 rounded-full" /> : <PersonIcon className="hover:text-gray-500 hover:cursor-pointer" />
                }
              </TooltipTrigger>
              <TooltipContent>
                <p>@{username}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => {router.push("/admin")}}>
                <Pencil1Icon className="w-5 h-5 hover:text-gray-500 hover:cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Admin</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          </div>
      </div>
    </div>
  );
};

export default Header;