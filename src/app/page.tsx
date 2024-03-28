import Image from "next/image";
import heroImg from "../../public/assets/hero.png";

export default function Home() {
  return (
    <div className="containerHome bg-zinc-950 w-full flex flex-col items-center justify-center">
      <main>
        <div className="flex flex-col items-center justify-center">
          <Image
            className="max-w-[380px] sm:max-w-[480px] object-contain w-auto h-auto"
            alt="Logo Tarefas+"
            src={heroImg}
            width={900}
            height={900}
            priority
          />
        </div>
        <h1 className="text-zinc-50 items-center m-7 sm:leading-9 text-center font-semibold text-2xl sm:text-3xl">
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>
        <div className="flex sm:flex-row gap-8 flex-col items-center justify-around">
          <section className="bg-zinc-300 hover:font-bold w-4/5 text-center py-3 px-11 rounded-lg hover:scale-105 hover:bg-zinc-50 duration-300 transition-all">
            <span>+12 Posts</span>
          </section>
          <section className="bg-zinc-300 hover:font-bold w-4/5 text-center py-3 px-11 rounded-lg hover:scale-105 hover:bg-zinc-50 duration-300 transition-all">
            <span>+90 Comentarios</span>
          </section>
        </div>
      </main>
    </div>
  );
}
