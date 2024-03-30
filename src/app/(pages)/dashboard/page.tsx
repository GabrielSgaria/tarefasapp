import { authOptions } from "@/app/lib/auth";
import { FormTarefa } from "@/components/form-tarefa";
import { List } from "@/components/list";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


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
            <FormTarefa userEmail={session?.user?.email} />
          </div>
        </section>

        <section className="mt-9 mx-auto px-4 max-w-[1024px] flex flex-col">
          <h1 className="text-center text-xl mb-4 font-bold sm:text-3xl">
            Minhas Tarefas
          </h1>
          <List userEmail={session?.user?.email} />
        </section>
      </main>
    </div>
    
  );

}
