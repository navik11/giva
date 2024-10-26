"use client"
import AuthChecker from "@/components/AuthChecker";
import Header from "@/components/Header";
import { ArrowLeftIcon} from "@radix-ui/react-icons";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product, UserObj } from "@/type/user";

export default function PutProductPage() {

  const router = useRouter();

  const { id } = useParams();

  const [msg, setMsg] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [btnText, setBtnText] = React.useState<string>("");
  const [product, setProduct] = useState<Product>();

  React.useEffect(() => {
    if (isLoading) {
      setBtnText(() => "Updating...");
    } else {
      setBtnText(() => "Update Product");
    }
  }, [isLoading]);
  let user : UserObj;

  useEffect(() => {
    if (typeof window !== "undefined")
      user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : "";
  });

  const getProductDetail = async () => {
    setIsLoading(() => true);
    await axios({
      method: "get",
      url: process.env.NEXT_PUBLIC_GIVA_SERVER + "/user/product/"+id,
      // withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json"
      }
    }).then((res) => {
      console.log(res);
      setProduct(() => res?.data?.data || {});
    }).catch((err) => {
      console.log(err);
      setMsg(() => { return err?.response?.data?.messege || "Something went wrong" });
    });
    setIsLoading(() => false)
  }

  useEffect(() => {
    getProductDetail();
  }, [])

  let formData: FormData;
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setMsg(() => "");
    setIsLoading(() => true);
    formData = new FormData(e.target as HTMLFormElement);
    formData.append("accessToken", user?.token);

    await axios({
      method: "put",
      url: process.env.NEXT_PUBLIC_GIVA_SERVER + "/user/product/"+id,
      data: formData,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json"
      }
    }).then((res) => {
      console.log(res);
      setMsg(() => { return "Product updated" });
      (e.target as HTMLFormElement).reset()
      getProductDetail();
    }).catch((err) => {
      console.log(err);
      setMsg(() => { return err?.response?.data?.messege || "Something went wrong" });
    });

    setIsLoading(() => false);
    console.log("Product updated");
  }

  return (
    <AuthChecker conDiv={
      <div className="flex items-center justify-center">
        <div className="w-[75vw] px-8">
          <Header />
          <div className="flex justify-between items-center mt-10">
            <div className="text-xl font-bold">
              Upadate product
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={() => { router.push("/admin") }}><ArrowLeftIcon className="hover:text-gray-500 hover:cursor-pointer text-gray-700" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Admin</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="py-5 mt-3 w-full">

            <form onSubmit={handleUpdate}>
              <div className="grid w-full items-center gap-4 grid-cols-2">
                {/* Product Name */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" required defaultValue={product?.name} />
                </div>

                {/* Description */}
                <div className="flex flex-col space-y-1.5 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={product?.description}/>
                </div>

                {/* Price */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" name="price" type="number" step="0.01" required defaultValue={product?.price}/>
                </div>

                {/* Avatar (Image URL) */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="avatar">Avatar</Label>
                  <Input id="avatar" name="avatar" type="file" />
                </div>

                {/* Stock */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" name="stock" type="number" required defaultValue={product?.stock}/>
                </div>

                {/* Material */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="material">Material</Label>
                  <Input id="material" name="material" defaultValue={product?.material}/>
                </div>

                {/* Weight */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="weight">Weight (g)</Label>
                  <Input id="weight" name="weight" type="number" step="0.01" defaultValue={product?.weight}/>
                </div>

                {/* Gemstone */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="gemstone">Gemstone</Label>
                  <Input id="gemstone" name="gemstone" defaultValue={product?.gemstone}/>
                </div>

                {/* Carat */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="carat">Carat</Label>
                  <Input id="carat" name="carat" type="number" step="0.01"  defaultValue={product?.carat}/>
                </div>

                {/* Size */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="size">Size</Label>
                  <Input id="size" name="size"  defaultValue={product?.size}/>
                </div>

                {/* Type */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="type">Type</Label>
                  <Input id="type" name="type" defaultValue={product?.type}/>
                </div>

                {/* Rating */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="rating">Rating</Label>
                  <Input id="rating" name="rating" type="number" step="0.01"  defaultValue={product?.rating}/>
                </div>
              </div>
              <div className="flex items-center justify-between w-full mt-6">
                <div className="text-sm w-full">
                  {msg}
                </div>
                <div className="col-span-2">
                  <Button className="self-end" type="submit" disabled={isLoading}>{btnText}</Button>
                </div>
              </div>
              <div className="text-xs mt-5 items-center justify-center w-full flex">
                Navigate to
                <span className="mx-2 text-gray-800 underline underline-offset-4 hover:text-gray-500 hover:cursor-pointer" onClick={() => { router.push("/admin") }}>Admin</span> or
                <span className="ms-2 text-gray-800 underline underline-offset-4 hover:text-gray-500 hover:cursor-pointer" onClick={() => router.push("/collection")}>Collection</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    } />
  );
}


