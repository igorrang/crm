"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { addDays, format } from "date-fns"

import { Calendar as CalendarIcon, Trash2, FileX } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/service/lib/utils"
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
import axios from "axios";

export interface Payment {
  _id: string;
  dataInicio: string;
  nome: string;
  origem: string;
  nickname: string;
  observacao: string;
  valorFicha: string;
  status: "Pendente" | "Processando" | "Sucesso" | "Fracassado";
  ultimaAtualizacao: string;
}

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
    accessorKey: "nickname",
    header: "Nickname",
    cell: ({ row }) => (
      <div className="capitalize text-white">{row.getValue("nickname")}</div>
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
        <DialogEditarCliente identificador_props={row.getValue("id_cliente")} dataInicio_props={row.getValue("dataInicio")} nome_props={row.getValue("nome")} origem_props={row.getValue("origem")} nickName_props={row.getValue("nickname")}  observacao_props={row.getValue("observacao")} valorFicha_props={row.getValue("valorFicha")} status_props={row.getValue("status")} ultimaAtualizacao_props={row.getValue("ultimaAtualizacao")}></DialogEditarCliente>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const handleDelete = async () => {
        if (confirm("Tem certeza que deseja excluir este registro?")) {
          try {
            await axios.delete(`/api/planilha/${row.original._id}`);
            window.location.reload();
          } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir o registro");
          }
        }
      };

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
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
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
  const [isLoading, setIsLoading] = useState(false);

  // Função para listar os dados da tabela assim que entrar na pagina da planilha
  const listarDados = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/table");
      const dados = await res.json();
      setData(dados);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Inicia uma função ao carregar a pagina
  useEffect(() => {
    const fetchData = async () => {
      try {
        await listarDados();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);
    

  const table = useReactTable({
    data,
    columns: columns,
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
    setIsLoading(true);
    try {
      const dateFrom = date?.from;
      const dateTo = date?.to;
      
      if (!dateFrom || !dateTo) return;

      const res = await fetch("/api/filtroTable", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dateFrom, dateTo })
      });
      
      const dados = await res.json();
      setData(dados);
    } catch (error) {
      console.error("Erro ao filtrar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  // Função para o filtrar por periodos
  const filtroPeriodo = async (dateFrom: Date, dateTo: Date): Promise<void> => {    
    setIsLoading(true);
    try {
      const res = await fetch("/api/filtroTable", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dateFrom, dateTo })
      });
      
      const dados = await res.json();
      setData(dados);
    } catch (error) {
      console.error("Erro ao filtrar por período:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  // Melhore a performance usando useCallback para funções que são passadas como props
  const handleColumnVisibilityChange = useCallback((value: VisibilityState) => {
    setColumnVisibility(value);
  }, []);

  // Adicione esta função
  const handleDeleteAll = async () => {
    if (confirm("Tem certeza que deseja excluir toda a planilha? Esta ação não pode ser desfeita.")) {
      try {
        const res = await fetch('/api/planilha', {
          method: 'DELETE'
        });

        if (res.ok) {
          setData([]); // Limpa os dados localmente
          alert("Planilha excluída com sucesso!");
        } else {
          throw new Error('Erro ao excluir planilha');
        }
      } catch (error) {
        console.error("Erro ao excluir planilha:", error);
        alert("Erro ao excluir a planilha");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center flex-wrap py-4">
        <div className={cn("grid gap-2", className)}>
          <Link href="/Cadastro">
          </Link>
          
        
        </div>
        <Button 
            variant="outline"
            onClick={handleDeleteAll}
            className="flex items-center gap-2 text-white hover:text-red-600 ml-2"
          >
            <FileX className="h-4 w-4 ml-0 m-1" />
            Excluir Planilha
          </Button> 
        <Input className="max-w-[300px] m-1 ml-0 bg-secondary" placeholder="Filtrar por nome..." value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("nome")?.setFilterValue(event.target.value)} />
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
      <div className="rounded-md border border-white/70">
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
                  className="h-24 text-center text-white "
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
      
      {/* Adicione loading state */}
      {isLoading && (
        <div className="flex justify-center items-center h-24">
          <span className="text-white">Carregando...</span>
        </div>
      )}
    </div>
  );
}