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

const data: Payment[] = [
  
]

export type Payment = {
  id: string;
  dataInicio: string;
  nome: string;
  origem: string;
  observacoes: string;
  valorFichas: string;
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
    accessorKey: "dataInicio",
    header: "Data de Inicio",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("dataInicio")}</div>
    ),
  },
  {
    accessorKey: "nome",
    header: "Nome",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "origem",
    header: "Origem",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("origem")}</div>
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
    accessorKey: "valorFichas",
    header: "Valor das fichas",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("valorFichas")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "ultimaAtualizacao",
    header: "Ultima Atualização",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ultimaAtualizacao")}</div>
    ),
  },
  {
    id: "id",
    accessorKey: "id",
    header: "Editar",
    enableHiding: false,
    cell: ({ row }) => {

      // variaveis pra receber o valor de cada coluna e imprimir no input
      const [identificador, setIdentificador] = useState('')
      const [dataInicio, setDataInicio] = useState('')
      const [nome, setNome] = useState('')
      const [origem, setOrigem] = useState('')
      const [observacoes, setObservacoes] = useState('')
      const [valorFichas, setValorFichas] = useState('')
      const [status, setStatus] = useState('')
      const [ultimaAtualizacao, setUltimaAtualizacao] = useState('')
      
      // Pega o valor da coluna de cada linha e imprime no campo do input
      useEffect(() => {
        setIdentificador(row.getValue("id") || '');
        setDataInicio(row.getValue("dataInicio") || '');
        setNome(row.getValue("nome") || '');
        setOrigem(row.getValue("origem") || '');
        setObservacoes(row.getValue("observacoes") || '');
        setValorFichas(row.getValue("valorFichas") || '');
        setStatus(row.getValue("status") || '');
        setUltimaAtualizacao(row.getValue("ultimaAtualizacao") || '');
      }, [row]);
    
      return (  
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="clean">Editar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
            <DialogDescription>Editar dados do cliente</DialogDescription>
          </DialogHeader>
          <form action="" className="">
            
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <div className=" items-center gap-4">
                  <Input
                    id="identificador"
                    className="hidden"
                    value={identificador} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setIdentificador(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
                <div className=" items-center gap-4">
                  <Label htmlFor="dataInicio" className="text-right"> Data de Inicio </Label>
                  <Input
                    id="dataInicio"
                    className=""
                    value={dataInicio} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setDataInicio(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="nome" className="text-right"> Nome </Label>
                  <Input
                    id="nome"
                    className=""
                    value={nome} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setNome(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="origem" className="text-right"> Origem </Label>
                  <Input
                    id="origem"
                    className=""
                    value={origem} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setOrigem(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
              </div>
              <div>
                <div className="items-center gap-4">
                  <Label htmlFor="observacoes" className="text-right"> Observacoes </Label>
                  <Input
                    id="observacoes"
                    className=""
                    value={observacoes} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setObservacoes(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="valorFichas" className="text-right"> Valor Fichas </Label>
                  <Input
                    id="valorFichas"
                    className=""
                    value={valorFichas} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setValorFichas(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="status" className="text-right"> Status </Label>
                  <Input
                    id="status"
                    className=""
                    value={status} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setStatus(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="ultimaAtualizacao" className="text-right"> Ultima Atualizacao </Label>
                  <Input
                    id="ultimaAtualizacao"
                    className=""
                    value={ultimaAtualizacao} // Pega o valor da coluna em especifico e ja atribui a seu proprio valor
                    onChange={(e) => setUltimaAtualizacao(e.target.value)} // Quando o usuario editar o valor, editar o valor da variavel
                    required
                  />
                </div>
              <DialogFooter className="mt-24">
                <Button type="submit">Confirmar</Button>
              </DialogFooter>
              </div>
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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
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
          placeholder="Filtrar por origem..."
          value={(table.getColumn("origem")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("origem")?.setFilterValue(event.target.value)
          }
          className="max-w-[300px] mr-2"
        />
        <Input
          placeholder="Filtrar por data de inicio..."
          value={(table.getColumn("dataInicio")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("dataInicio")?.setFilterValue(event.target.value)
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