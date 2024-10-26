"use client"
import AuthChecker from "@/components/AuthChecker";
import Header from "@/components/Header";
import { ArrowLeftIcon, Pencil2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { UserObj } from "@/type/user";

const data = [
  {
    "id": 1,
    "name": "Gold Pendant",
    "description": "Elegant gold pendant with intricate design.",
    "price": 150.00,
    "avatar": "https://example.com/images/gold_pendant.jpg",
    "stock": 10,
    "material": "Gold",
    "weight": 5.25,
    "gemstone": "Diamond",
    "carat": 0.50,
    "size": null,
    "type": "Pendant",
    "rating": 4.75,
    "created_at": "2024-10-01T10:00:00Z",
    "updated_at": "2024-10-01T10:00:00Z"
  },
]
// const data = [
//   {
//     "id": 1,
//     "name": "Gold Pendant",
//     "description": "Elegant gold pendant with intricate design.",
//     "price": 150.00,
//     "avatar": "https://example.com/images/gold_pendant.jpg",
//     "stock": 10,
//     "material": "Gold",
//     "weight": 5.25,
//     "gemstone": "Diamond",
//     "carat": 0.50,
//     "size": null,
//     "type": "Pendant",
//     "rating": 4.75,
//     "created_at": "2024-10-01T10:00:00Z",
//     "updated_at": "2024-10-01T10:00:00Z"
//   },
//   {
//     "id": 2,
//     "name": "Silver Ring",
//     "description": "Stylish silver ring with a modern look.",
//     "price": 75.50,
//     "avatar": "https://example.com/images/silver_ring.jpg",
//     "stock": 5,
//     "material": "Silver",
//     "weight": 3.15,
//     "gemstone": "Ruby",
//     "carat": 0.25,
//     "size": "7",
//     "type": "Ring",
//     "rating": 4.50,
//     "created_at": "2024-10-02T12:30:00Z",
//     "updated_at": "2024-10-02T12:30:00Z"
//   },
//   {
//     "id": 3,
//     "name": "Platinum Bracelet",
//     "description": "Luxurious platinum bracelet with diamond accents.",
//     "price": 1200.00,
//     "avatar": "https://example.com/images/platinum_bracelet.jpg",
//     "stock": 2,
//     "material": "Platinum",
//     "weight": 15.75,
//     "gemstone": null,
//     "carat": null,
//     "size": "Medium",
//     "type": "Bracelet",
//     "rating": 5.00,
//     "created_at": "2024-10-03T14:15:00Z",
//     "updated_at": "2024-10-03T14:15:00Z"
//   },
//   {
//     "id": 4,
//     "name": "Emerald Necklace",
//     "description": "Beautiful necklace featuring emeralds and gold.",
//     "price": 350.00,
//     "avatar": "https://example.com/images/emerald_necklace.jpg",
//     "stock": 0,
//     "material": "Gold",
//     "weight": 10.00,
//     "gemstone": "Emerald",
//     "carat": 1.00,
//     "size": null,
//     "type": "Necklace",
//     "rating": 4.80,
//     "created_at": "2024-10-04T16:45:00Z",
//     "updated_at": "2024-10-04T16:45:00Z"
//   },
//   {
//     "id": 5,
//     "name": "Sapphire Earrings",
//     "description": "Dazzling sapphire earrings that add elegance.",
//     "price": 200.00,
//     "avatar": "https://example.com/images/sapphire_earrings.jpg",
//     "stock": 15,
//     "material": "Gold",
//     "weight": 4.50,
//     "gemstone": "Sapphire",
//     "carat": 0.75,
//     "size": null,
//     "type": "Earrings",
//     "rating": 4.90,
//     "created_at": "2024-10-05T09:30:00Z",
//     "updated_at": "2024-10-05T09:30:00Z"
//   }
// ]


export default function AdminPage() {

  const [dataset, setData] = React.useState(data);

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

  const handleDelete = async (id: number) => {

    await axios({
      method: "delete",
      url: process.env.NEXT_PUBLIC_GIVA_SERVER + "/user/product/" + id + "?accessToken=" + user?.token,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json"
      }
    }).then((res) => {
      getData();
      console.log(res);
    }).catch(() => {
      router.push("/admin");
    });
  }

  return (
    <AuthChecker conDiv={
      <div className="flex items-center justify-center">
        <div className="w-[75vw] px-8">
          <Header />
          <div className="flex justify-between items-center mt-10">
            <div className="text-xl font-bold">
              Product manager
            </div>
            <div>
              
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={() => { router.push("/addProduct") }}><PlusCircledIcon className="hover:text-gray-500 hover:cursor-pointer text-gray-700" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add new product</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={() => { router.push("/") }}><ArrowLeftIcon className="hover:text-gray-500 hover:cursor-pointer text-gray-700 ms-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            </div>
          </div>
          <div className="py-5 mt-3">
            <Table>
              <TableCaption className="mt-10">products @Giva Store.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Price (Rs.)</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataset.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="font-medium">{data.name}</TableCell>
                    <TableCell>{data.material}</TableCell>
                    <TableCell>{data.type}</TableCell>
                    <TableCell>{data.weight}</TableCell>
                    <TableCell>{data.rating}</TableCell>
                    <TableCell className="text-right">{data.price}</TableCell>
                    <TableCell className="flex items-end justify-end">
                      <div className="flex h-5 space-x-4 text-sm items-end justify-end">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger onClick={() => { router.push("/updateproduct/" + data.id) }}><Pencil2Icon className="hover:text-gray-500 hover:cursor-pointer text-gray-700" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <TrashIcon className="hover:text-gray-500 hover:cursor-pointer text-gray-700" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action can not be undone and will remove the <b>{data.name}</b> from the store.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="hover:bg-red-500" onClick={async () => { data.name = "deleting . . "; await handleDelete(data.id) }}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    } />
  );
}


