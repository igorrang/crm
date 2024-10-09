"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react"
import axios from "axios"
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

// Props para receber os dados ao chamar o component
export interface dialogFichasProps {
  identificador_props: string
  
}
 
export default function DialogFichas({identificador_props}: dialogFichasProps) {
  // useState pra receber o valor de cada coluna e imprimir no input
  const [identificadorCliente, setIdentificadorCliente] = useState('')
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [valorReais, setValorReais] = useState('')
  const [valorFicha, setValorFicha] = useState('')
  const [anexo, setAnexo] = useState('')

  // Pega o valor da coluna de cada linha e imprime no campo do input
  useEffect(() => {
    setIdentificadorCliente(identificador_props || '');
  });


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="clean">Fichas</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Fichas</DialogTitle>
          <DialogDescription>Registrar compra de fichas</DialogDescription>
        </DialogHeader>
        <form  className="grid grid-cols-2 gap-4 py-4" encType="multipart/form-data">
            <div>
              {/* Serve pro identificador do cliente */}
              <div className="  gap-4">
                <Input id="identificador" className="hidden" value={identificadorCliente}  onChange={(e) => setIdentificadorCliente(e.target.value)} required/>
              </div>
              <div className="gap-4">
                <Label htmlFor="data" className="text-right"> Data </Label>
                <Input id="data" type="date" value={data}  onChange={(e) => setData(e.target.value)} required/>
              </div>
              <div className=" gap-4">
                <Label htmlFor="hora" className="text-right"> Hora </Label>
                <Input id="hora" value={hora}  onChange={(e) => setHora(e.target.value)} required/>
              </div>
            </div>
            <div>
              <div className=" gap-4">
                <Label htmlFor="valorReais" className="text-right"> Valor Reais </Label>
                <Input id="valorReais" value={valorReais}  onChange={(e) => setValorReais(e.target.value)} required
                  onKeyDown={(e) => {
                    if(e.key === ",") {
                      e.preventDefault()
                      window.alert('Utilize o "." para inserir os centavos')
                    }
                  }}
                />
              </div>
                
              <div className=" gap-4">
                <Label htmlFor="valorFichas" className="text-right"> Valor Fichas </Label>
                <Input id="valorFichas" value={valorFicha}  onChange={(e) => setValorFicha(e.target.value)} required
                  onKeyDown={(e) => {
                    if(e.key === ",") {
                      e.preventDefault()
                      window.alert('Utilize o "." para inserir os centavos')
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-span-2 gap-2">
              <Label htmlFor="anexo" className="text-right"> Anexo </Label>
              <Input id="anexo" type="file" value={anexo}  onChange={(e) => setAnexo(e.target.value)} required />
            </div>
            <DialogFooter className="mt-24">
              <Button type="submit">Confirmar</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  )
}