import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Product } from "@/type/user";

const ProductCard = ({ product }: {product: Product}) => {
    const {name, description, price, avatar, material } = product
  return (
    <Card className="w-[20rem] max-w-sm max-h-96 bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="p-0 relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={avatar || "/dummy-jewel.png"} // Replace with a default image if needed
          alt={`${name} image`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg w-[20rem]"
        />
      </CardHeader>

      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <Badge className="text-xs rounded-full bg-slate-100 text-black px-2 py-1">
            {material || "Material not specified"}
          </Badge>
        </div>
        <p className="text-gray-600 text-sm max-h-9 overflow-hidden"><b>{"$ "+ price}</b>{" - " +description || "No description available."}</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
