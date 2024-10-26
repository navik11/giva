"use client"

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Product, UserObj } from "@/type/user";
import CollectionHeader from "@/components/CollectioHeader";
import ProductCard from "@/components/ProductCard";

export default function CollectionPage() {

  const [dataset, setData] = React.useState<Product[]>();

  const router = useRouter();
  let user: UserObj;

  useEffect(() => {
    if (typeof window !== "undefined")
      user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : "";
    console.log(user);
  });

  const getData = () => {
    axios({
      method: "get",
      url: process.env.NEXT_PUBLIC_GIVA_SERVER + "/user/allProducts",
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json"
      }
    }).then((res) => {
      console.log(res);
      setData(() => res.data.data);
    }).catch((err) => {
      console.log(err);
      window.alert("Something went wrong");
    });
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="flex items-center justify-center">
      <div className="w-[75vw] px-8">
        <CollectionHeader />
        <div className="flex justify-between items-center mt-10">
          <div className="text-xl font-bold">
            All products
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => { router.push("/") }}><ArrowLeftIcon className="hover:text-gray-500 hover:cursor-pointer text-gray-700" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="py-5 mt-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-auto gap-y-10">
          {dataset?.map((data: Product) => (
            <ProductCard key={data.id} product={data} />
          ))}
        </div>
      </div>
    </div>
  );
}


