"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export interface cardDashBoardProps {
  titulo: string
  valor: string
}

export default function CardDashBoard({titulo, valor}: cardDashBoardProps) {
  return (
    <Card className="w-[300px] m-3 flex py-5">
      <CardHeader className="w-[30%] flex items-center justify-center p-0 ">
        <img src="/geracao-de-leads.png" alt="" className="w-[60px] rounded-2xl"/>
      </CardHeader>
      <CardContent className="w-[70%] flex flex-col justify-center p-0">
        <CardDescription className="text-md">{titulo}</CardDescription>
        <CardTitle className="text-3xl text-gray-700">{valor}</CardTitle>
      </CardContent>
    </Card>
    
  );
}