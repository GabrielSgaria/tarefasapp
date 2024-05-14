import { authOptions } from "@/app/lib/auth";
import { FormComment } from "@/components/form-comment";
import { db } from "@/services/firebaseConnection";
import {  doc, getDoc, } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export default async function Task({ params: { id }, }: { params: { id: string }; }) {

  const docRef = doc(db, "tarefas", id);

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    redirect("/")
  }

  if (!snapshot.data()?.public) {
    redirect("/");
  }

  const miliseconds = snapshot.data()?.created?.seconds * 1000;

  const task = {
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id,
  }

  async function getUserSession() {
    const session = await getServerSession(authOptions);
    return session;
  }
  const session = await getUserSession();


  return (
    <div className="container mx-auto mt-[40px] flex flex-col justify-center items-center max-w-[1024px] w-full">
      <main className="w-full">
        <h1 className="mb-[14px] font-bold text-3xl">Tarefa</h1>
        <article className="p-[14px] border-[1.5px] border-solid border-zinc-400 flex items-center justify-center rounded-xl">
          <p className="whitespace-pre-wrap w-full">{task.tarefa}</p>
        </article>
      </main>
      <FormComment sessionEmail={session?.user?.email} sessionName={session?.user?.name} idTask={task.taskId} />
      
    </div>
  );
}
