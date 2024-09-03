"use client"

import { Label } from "@radix-ui/react-dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "@radix-ui/themes"
import { Input } from "./ui/input"




export function PopoverCliente() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Mudar Status</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white p-4 border shadow-md rounded-2xl">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Mudar Status</h4>
            <p className="text-sm text-muted-foreground">
              Selecione o atual status do cliente
            </p>
          </div>
          <div className="">
           <form action="" className="flex flex-col items-start justify-center">
            <div >
              <input type="radio" id="fracassado" name="fav_language" value="fracassado"/>
              <label htmlFor="fracassado" className="ml-3 py-2 text-xl font-black">fracassado</label>
            </div>
            <div>
              <input type="radio" id="processando" name="fav_language" value="processando"/>
              <label htmlFor="processando" className="ml-3 py-2 text-xl font-black">processando</label>
            </div>
            <div>
              <input type="radio" id="sucesso" name="fav_language" value="sucesso"/>
              <label htmlFor="sucesso" className="ml-3 py-2 text-xl font-black">Sucesso</label>
            </div>
           
            <input type="submit" className="mt-3 py-1 px-3 rounded-xl text-[18px] text-white bg-primary hover:bg-green-600" value="Confirmar"/>
           </form>

          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
