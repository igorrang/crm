'use client'

import CardDashBoard from "@/components/cards/cardDashBoard";
import Header from "@/components/header";
import MensagemBemVindo from "@/components/mensagemBemVindo";
import Navbar from "@/components/narbar";
import { Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"

import Image from "next/image";
import Link from "next/link";
import { addDays, format } from "date-fns"
import axios from "axios";
import { cn } from "@/lib/utils"

import { IoMdContact } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export default function Index() {
  const [origem, setOrigem] = useState('Todas origens')

  // esse date corresponde ao valor de quando filtrar uma data ate outra data
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  })

  // Função que realizará o filtro de uma data ate outra data e carregar todos dados correspondentes
  const filtroDataFromTo = async () => {
    const dateFrom = date?.from // Pegando a data inicial do filtro
    const dateTo = date?.to // Pegando a data final do filtro
    
    const res = await axios.post("/api/filtroTable", {dateFrom, dateTo});
  }
  
  // Função para o filtrar por periodos
  const filtroPeriodo = async (dateFrom: Date, dateTo: Date): Promise<void> => {    
    const res = await axios.post("/api/filtroTable", {dateFrom, dateTo});
  }

  return (
    <main>
      <Header></Header>
      <div className="flex ">
        <Navbar></Navbar>

        <div className=" w-full min-h-[94vh] p-1 flex flex-col items-start lg:items-start bg-gradient-to-l from-black via-black/90 to-black/85">
          <div className="w-full flex flex-wrap items-center justify-between ">
            <MensagemBemVindo></MensagemBemVindo>
            {/* Popover para filtrar os dados de uma data ate outra data */}
            <div className="flex flex-wrap ">
              <Popover >
                <PopoverTrigger asChild className="m-3">
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[250px] justify-start text-left font-normal",
                      !date && "text-white/60"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Escolha uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 flex" align="start">
                  <div>
                    <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2}/>
                    <div className="flex justify-end mx-4 my-2">
                      <Button onClick={filtroDataFromTo}>Filtrar</Button>
                    </div>
                  </div>
                  {/* Filtro por períodos já pré estabelecidos */}
                  <div className=" mx-4 my-3">
                    <h1 className="text-white/80">Períodos</h1>
                    <div className="mx-3 flex flex-col items-start">
                      <Button variant='clean' size='clean' className="text-white/80 my-0.5" >Máximo</Button>
                      <Button variant='clean' size='clean' className="text-white/80 my-0.5" onClick={() => filtroPeriodo(new Date(), new Date())}>Hoje</Button>
                      <Button variant='clean' size='clean' className="text-white/80 my-0.5" onClick={() => filtroPeriodo(new Date(new Date().setDate(new Date().getDate() - 1)), new Date(new Date().setDate(new Date().getDate() - 1)))}>Ontem</Button>
                      <Button variant='clean' size='clean' className="text-white/80 my-0.5" onClick={() => filtroPeriodo(new Date(new Date().setDate(new Date().getDate() - 7)), new Date())}>Últimos 7 dias</Button>
                      <Button variant='clean' size='clean' className="text-white/80 my-0.5" onClick={() => filtroPeriodo(new Date(new Date().setDate(new Date().getDate() - 14)), new Date())}>Últimos 14 dias</Button>
                      <Button variant='clean' size='clean' className="text-white/80 my-0.5" onClick={() => filtroPeriodo(new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date())}>Este mês</Button>
                      <Button variant='clean' size='clean' className="text-white/80 my-0.5" onClick={() => filtroPeriodo(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), new Date(new Date().getFullYear(), new Date().getMonth(), 0))}>Mês passado</Button>
                      <Button variant='clean' size='clean' className="text-white/80 my-0.5"></Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <div className=" flex flex-col  gap-2 m-3">
                <DropdownMenu> 
                  <DropdownMenuTrigger asChild className="justify-start " >
                    <Button variant="outline" className="">{origem}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Painel origem</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={origem} onValueChange={setOrigem}>
                      <DropdownMenuRadioItem value="Todas origens"> Todas origens</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Instagram (Bio)"> Instagram (Bio)</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Indicação">Indicação</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Anuncio">Anuncio</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Container controle de leads */}
          <div className="w-full">
            <h1 className="text-[20px] m-3 mb-0 text-white leading-none tracking-tight">Controle de leads</h1>
            <div className="w-full grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
              <CardDashBoard titulo="Total de leads" valor="200" urlIcone="/icons/totalleads.png"/>
              <CardDashBoard titulo="Nunca respondeu" valor="50" urlIcone="/icons/clientenaorespondeu.png"/>
              <CardDashBoard titulo="Primeiro contato" valor="150" urlIcone="/icons/primeriocontato.png"/>
              <CardDashBoard titulo="Cadastrou-se" valor="100" urlIcone="/icons/cadastrou.png"/>
              <CardDashBoard titulo="Carregou fichas" valor="80" urlIcone="/icons/carregoufichasDois.png"/>
              <CardDashBoard titulo="Desistiram" valor="10" urlIcone="/icons/desistiram.png"/>
            </div>
          </div>
          
          {/* Container controle de clientes */}
          <div className="w-full mt-10">
            <h1 className="text-[20px] m-3 mb-0 text-white leading-none tracking-tight">Controle de clientes</h1>
            <div className="w-full grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
              <CardDashBoard titulo="Total de vendas" valor="200" urlIcone="/icons/totalvendas.png"/>
              <CardDashBoard titulo="Ticket médio" valor="50" urlIcone="/icons/ticketmedio.png"/>
              <CardDashBoard titulo="Faturamento" valor="150" urlIcone="/icons/faturamento.png"/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
