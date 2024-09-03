"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon,} from "@radix-ui/react-icons";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import Link from "next/link";
import { Label } from "../ui/label";

export type Payment = {
  id: string;
  dataInicio: string;
  nome: string;
  contato: string;
  tipo: string;
  Anuncio: string;
  descricaoServico: string;
  observacoes: string;
  valor: string;
  
  status: "Pendente" | "Processando" | "Sucesso" | "Fracassado";
  ultimaAtualizacao: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Data_de_Inicio",
    header: "Data de Inicio",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Data_de_Inicio")}</div>
    ),
  },

  {
    accessorKey: "Nome",
    header: "nome",
    cell: ({ row }) => <div className="capitalize">{row.getValue("Nome")}</div>,
  },
  {
    accessorKey: "Contato",
    header: "Contato",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Contato")}</div>
    ),
  },

  {
    accessorKey: "Anuncio",
    header: "Anuncio",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Anuncio")}</div>
    ),
  },

  {
    accessorKey: "observacoes",
    header: "Observacoes",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("observacoes")}</div>
    ),
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("Status")}</div>
    ),
  },
  {
    accessorKey: "valor_fichas",
    header: "Valor_Fichas",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("valor_fichas")}</div>
    ),
  },
  {
    id: "editar",
    enableHiding: false,
    cell: ({ row }) => {

      const [dataInicio, setDataInicio] = useState('')
      const [nome, setNome] = useState('')
      const [contato, setContato] = useState('')
      const [anuncio, setAnuncio] = useState('')
      const [observacoes, setObservacoes] = useState('')
      const [valorFichas, setValorFichas] = useState('')
      const [status, setStatus] = useState('')
      return (
        
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="clean">Editar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Editar</DialogTitle>
          <DialogDescription>
            Editar dados do cliente
          </DialogDescription>
        </DialogHeader>
        <form action="" className="grid grid-cols-2 gap-4 py-4">
          <div>
            <div className=" items-center gap-4">
              <Label htmlFor="dataInicio" className="text-right">
                Data de Inicio
              </Label>
              <Input
                id="dataInicio"
                className=""
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                required
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input
                id="nome"
                className=""
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="contato" className="text-right">
                Contato
              </Label>
              <Input
                id="contato"
                className=""
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                required
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="anuncio" className="text-right">
                Anuncio
              </Label>
              <Input
                id="anuncio"
                className=""
                value={anuncio}
                onChange={(e) => setAnuncio(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div className="items-center gap-4">
              <Label htmlFor="observacoes" className="text-right">
                Observacoes
              </Label>
              <Input
                id="observacoes"
                className=""
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                required
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="valorFichas" className="text-right">
                Valor Fichas
              </Label>
              <Input
                id="valorFichas"
                className=""
                value={valorFichas}
                onChange={(e) => setValorFichas(e.target.value)}
                required
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Input
                id="status"
                className=""
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
            </div>
          <DialogFooter className="mt-24">
            <Button type="submit">Confirmar</Button>
          </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar ID do Pagamento
            </DropdownMenuItem> */}
            <Link href="/VerCliente">
              <DropdownMenuItem>Ver Cliente</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />

            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable() {
  
  const [data, setData] = useState<Payment[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const inserirDados = async () => {
    const data = '2022/02/05'
    const nome = 'Igor muito muito feio'
    const contato = '51 993293152'
    const anuncio = 'Instagran'
    const observacoes = 'Ricu'
    const valor_fichas = '322'
    const status = 'Feitu'
    const res = await axios.post("/api/table", {data, nome, contato, anuncio, observacoes, valor_fichas, status})
    console.log(res.data);
  }

  const listarDados = async () => {
        const res = await axios.get("/api/table");
        setData(res.data); // Atualiza o estado com os dados recebidos
    
};




  useEffect( () => {
    // inserirDados();
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

  return (
    <div className="w-full">      

      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por status..."
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("status")?.setFilterValue(event.target.value)
          }
          className="max-w-[300px] mr-2"
        />
        <Input
          placeholder="Filtrar por emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-[300px] mr-2"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
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
                    className="capitalize"
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
        <Table>
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
                  className="h-24 text-center"
                >
                  No results.
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}