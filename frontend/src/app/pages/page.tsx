import CardLogin from "@/components/cards/cardLogin";


export default function Home() {
  return (
    <main>
      <main className="w-full  h-[100vh]  ">
        <div className="absolute z-10 w-full h-[30vh] md:w-[30%] md:h-[100vh] bg-primary"></div>
        <div className="z-30 w-full  h-[100vh] flex justify-center items-center">
          <CardLogin></CardLogin>
        </div>
      </main>
    </main>
  );
}
