"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react"
import axios from "axios"

// Props para receber os dados ao chamar o component
export interface dialogEditarClienteProps {
  identificador_props: string
  dataInicio_props: string
  nome_props: string
  origem_props: string
  nickName_props: string
  observacao_props: string
  valorFicha_props: string
  status_props: string
  ultimaAtualizacao_props: string
}
 
export default function DialogEditarCliente({identificador_props,dataInicio_props, nome_props, origem_props, nickName_props,  observacao_props, valorFicha_props, status_props, ultimaAtualizacao_props}: dialogEditarClienteProps) {
  // useState pra receber o valor de cada coluna e imprimir no input
  const [identificador, setIdentificador] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [nome, setNome] = useState('')
  const [origem, setOrigem] = useState('')
  const [nickname, setNickname] = useState('')
  const [observacao, setObservacao] = useState('')
  const [valorFicha, setValorFicha] = useState('')
  const [status, setStatus] = useState('')
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState('')

  // Pega o valor da coluna de cada linha e imprime no campo do input
  useEffect(() => {
    setIdentificador(identificador_props || '');
    setDataInicio(dataInicio_props || '');
    setNome(nome_props || '');
    setOrigem(origem_props || '');
    setNickname(nickName_props || '');
    setObservacao(observacao_props || '');
    setValorFicha(valorFicha_props || '');
    setStatus(status_props || '');
    setUltimaAtualizacao(ultimaAtualizacao_props || '');
  }, [identificador_props, dataInicio_props, nome_props, origem_props, nickName_props, observacao_props, valorFicha_props, status_props, ultimaAtualizacao_props]);

  // Função que enviará os dados para o backend
  const editandoCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/table", {identificador, dataInicio, nome, origem, nickname, observacao, valorFicha, status, ultimaAtualizacao});
        // Verifique se a requisição foi bem-sucedida
      if (res.status === 200) {
          // Usar router.push para redirecionar e recarregar a página
          window.location.reload()
      } else {
        console.error('Erro ao cadastrar cliente:', res.statusText);
      }
    } catch (error) {
      console.error('Error posting client data:', error);
    }
  }

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
        <form onSubmit={editandoCliente} className="grid grid-cols-2 gap-4 py-4">
          <div>
            <div className="  gap-4">
              <Input id="identificador" className="hidden" value={identificador} onChange={(e) => setIdentificador(e.target.value)}/>
            </div>
            <div className="  gap-4">
              <Label htmlFor="dataInicio" className="text-right text-white"> Data de Inicio </Label>
              <Input id="dataInicio" type="date" className="" value={dataInicio}  onChange={(e) => setDataInicio(e.target.value)} required/>
            </div>
            <div className=" gap-4">
              <Label htmlFor="nome" className="text-right text-white"> Nome </Label>
              <Input id="nome" className="" value={nome}  onChange={(e) => setNome(e.target.value)} required/>
            </div>
            <div className="flex flex-col py-1 gap-2">
              <Label className="text-start text-white"> Origem </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="justify-start" >
                  <Button variant="outline" className="">{origem}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Painel origem</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={origem} onValueChange={setOrigem}>
                    <DropdownMenuRadioItem value="Instagram (Bio)"> Instagram (Bio)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Indicação">Indicação</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Anuncio">Anuncio</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className=" gap-4">
              <Label htmlFor="nickName" className="text-right text-white"> NickName </Label>
              <Input id="nickName" className="" value={nickname}  onChange={(e) => setNickname(e.target.value)} required/>
            </div>
          </div>
          <div>
           <div className=" gap-4">
              <Label htmlFor="observacoes" className="text-right text-white"> Observacoes </Label>
              <Input id="observacoes" className="" value={observacao}  onChange={(e) => setObservacao(e.target.value)} required/>
            </div>
            <div className=" gap-4">
              <Label htmlFor="valorFichas" className="text-right text-white"> Valor Fichas </Label>
              <Input id="valorFichas" className="" value={valorFicha}  onChange={(e) => setValorFicha(e.target.value)} required/>
            </div>
          <div className="flex flex-col py-1 gap-2">
              <Label className="text-start text-white"> Status </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="justify-start" >
                  <Button variant="outline" className="">{status}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Painel origem</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
                    <DropdownMenuRadioItem value="Fracassado"> Fracassado</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Pendente"> Pendente</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Processando">Processando</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Sucesso">Sucesso</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className=" gap-4">
              <Label htmlFor="ultimaAtualizacao" className="text-right text-white"> Ultima Atualizacao </Label>
              <Input id="ultimaAtualizacao" type="date" className="" value={ultimaAtualizacao}  onChange={(e) => setUltimaAtualizacao(e.target.value)} required/>
            </div>
            <DialogFooter className="mt-24">
              <Button type="submit">Confirmar</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}