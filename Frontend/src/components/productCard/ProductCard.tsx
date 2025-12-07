"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  short_desc: string;
  price: string;
  image_url: string;
}

const CardProductDemo = ({
  id,
  name,
  category,
  short_desc,
  price,
  image_url,
}: ProductCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="relative max-w-md rounded-xl bg-baground pt-0 shadow-lg hover:scale-103 cursor-pointer transition-transform duration-200">
      <div className="flex h-60 items-center justify-center">
        <img
          src={image_url}
          alt={name}
          className="object-cover w-full h-full rounded-t-xl"
        />
      </div>
      <Card className="border-none ">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Badge variant="default" className="rounded-md">
              {category}
            </Badge>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p>{short_desc}</p>
        </CardContent>

        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Price</span>
            <span className="text-xl font-semibold">${price}</span>
          </div>
          <Button
            size="lg"
            variant="default"
            onClick={() => navigate(`/products/${id}`)}
          >
            View product
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardProductDemo;
