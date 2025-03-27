import Header from "@/components/Header"
import Navbar from "@/components/Navbar"
import { CardLogin } from "@/components/CardLogin"
export default function Conta() {
  return (
    <main>
    <Header></Header>
    <div className="flex">
      <Navbar></Navbar>

      <div className="w-full min-h-[94vh] text-black bg-gradient-to-l from-black via-black/90 to-black/85 ">
          <div className="hidden lg:flex w-full py-4 px-10">
           <CardLogin></CardLogin>
                
              </div>
            </div>
          </div>
        
   
</main>
  )
}
