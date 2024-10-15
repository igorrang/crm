"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { addDays, format } from "date-fns"

import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon,} from "@radix-ui/react-icons";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import DialogEditarCliente from "../dialogs/dialogEditarCliente";
import DialogFichas from "../dialogs/dialogFichas";

const data: Payment[] = []

export type Payment = {
  id: string;
  dataInicio: string;
  nome: string;
  origem: string;
  observacao: string;
  valorFicha: string;
  status: "Pendente" | "Processando" | "Sucesso" | "Fracassado";
  ultimaAtualizacao: string;
};

export const columns: ColumnDef<Payment>[] = [
  
  {
    accessorKey: "dataInicio",
    header: "Data de Inicio",
    cell: ({ row }) => (
      <div className="capitalize text-white">{row.getValue("dataInicio")}</div>
    ),
  },
  {
    accessorKey: "nome",
    header: "Nome",
    cell: ({ row }) => <div className="capitalize text-white">{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "origem",
    header: "Origem",
    cell: ({ row }) => (
      <div className="capitalize text-white">{row.getValue("origem")}</div>
    ),
  },
  {
    accessorKey: "observacao",
    header: "Observação",
    cell: ({ row }) => (
      <div className="capitalize text-white">{row.getValue("observacao")}</div>
    ),
  },
  {
    accessorKey: "valorFicha",
    header: () => <div className="text-right">Valor das fichas</div>,
    cell: ({ row }) => {
      const valorFicha = parseFloat(row.getValue("valorFicha"))
      const formatted = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(valorFicha)
 
      return <div className="text-right font-medium text-white">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize text-white">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "ultimaAtualizacao",
    header: "Ultima Atualização",
    cell: ({ row }) => (
      <div className="capitalize text-white">{row.getValue("ultimaAtualizacao")}</div>
    ),
  },
  {
    id: "id_cliente",
    accessorKey: "id_cliente",
    header: "Editar",
    enableHiding: false,
    cell: ({ row }) => {
      return(
        <DialogEditarCliente identificador_props={row.getValue("id_cliente")} dataInicio_props={row.getValue("dataInicio")} nome_props={row.getValue("nome")} origem_props={row.getValue("origem")} observacao_props={row.getValue("observacao")} valorFicha_props={row.getValue("valorFicha")} status_props={row.getValue("status")} ultimaAtualizacao_props={row.getValue("ultimaAtualizacao")}></DialogEditarCliente>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <DotsHorizontalIcon className="h-4 w-4 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DialogFichas identificador_props={row.getValue("id_cliente")} /> 
            <DropdownMenuSeparator />
            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable({className,}: React.HTMLAttributes<HTMLDivElement>) {

  const [data, setData] = useState<Payment[]>([]); // UseState resposavel por listar as linhas da tabela
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Função para listar os dados da tabela assim que entrar na pagina da planilha
  const listarDados = async () => {
    const res = await axios.get("/api/table");
    setData(res.data); // Atualiza o estado com os dados recebidos
  };
  
  // Inicia uma função ao carregar a pagina
  useEffect( () => {
    listarDados(); 
  },[])
    

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

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
    setData(res.data)
  }
  
  // Função para o filtrar por periodos
  const filtroPeriodo = async (dateFrom: Date, dateTo: Date): Promise<void> => {    
    const res = await axios.post("/api/filtroTable", {dateFrom, dateTo});
    setData(res.data)
  }
  
  return (
    <div className="w-full ">      

      <div className="flex items-center flex-wrap py-4">
        <div className={cn("grid gap-2", className)}>
          {/* Popover para filtrar os dados de uma data ate outra data */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal m-1 ml-0",
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
                  <Button variant='clean' size='clean' className="text-white/80 my-0.5" onClick={listarDados}>Máximo</Button>
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
        </div>
        <Input className="max-w-[300px] m-1 ml-0 bg-secondary" placeholder="Filtrar por nome..." value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("nome")?.setFilterValue(event.target.value) } />
        <Input className="max-w-[300px] m-1 ml-0 bg-secondary" placeholder="Filtrar por origem..." value={(table.getColumn("origem")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("origem")?.setFilterValue(event.target.value)} />
        <Input className="max-w-[300px] m-1 ml-0 bg-secondary" placeholder="Filtrar por data de inicio..." value={(table.getColumn("dataInicio")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("dataInicio")?.setFilterValue(event.target.value)}/>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              Colunas <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-white"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="bg-secondary rounded-md">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-white"
                >
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de
          {table.getFilteredRowModel().rows.length} linha(s) selected.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Anterior</Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Próximo</Button>
        </div>
      </div>
    </div>
  );
}