
import { authOptions } from "@/app/lib/auth";
import { FormTarefa } from "@/components/form-tarefa";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FaTrashCan } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";


async function getUserSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export default async function Dashboard() {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }
 
  return (
    <div className="w-full h-full">
      <main>
        <section className="bg-zinc-950 w-full flex items-center justify-center ">
          <div className="max-w-[1024px] w-full px-4 pb-7 mt-14">
            <h1 className="text-zinc-50 mb-2">Qual sua tarefa?</h1>
            <FormTarefa userEmail={session?.user?.email}  />
          </div>
        </section>

        <section className="mt-9 mx-auto px-4 max-w-[1024px] flex flex-col">
          <h1 className="text-center text-xl mb-4 font-bold sm:text-3xl">
            Minhas Tarefas
          </h1>
          <article className="mb-4 leading-6 flex flex-col border-2 border-solid border-zinc-300 rounded-xl p-4 items-start">
            <div className="flex items-center justify-center mb-2">
              <label className="bg-blue-600 py-[2px] px-[6px] text-zinc-50 rounded-md text-sm">
                PUBLICO
              </label>
              <button className="bg-transparent mx-2 cursor-pointer">
                <FiShare2 className="size-5 text-blue-600" />
              </button>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="whitespace-pre-wrap">
                Minha primeira tarefa de exemplo, ótimo!!
              </p>
              <button className="">
                <FaTrashCan className="text-red-600 size-5 bg-transparent mx-2" />
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
