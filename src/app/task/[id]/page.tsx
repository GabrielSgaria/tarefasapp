import { db } from "@/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

export default async function Task({
  params: { id },
}: {
  params: { id: string };
}) {
  const docRef = doc(db, "tarefas", id);
  const snapshot = await getDoc(docRef);

  console.log(snapshot.data());

  if(snapshot.data() === undefined) {
    redirect("/")
  }

  if (!snapshot.data()?.public) {
    redirect("/");
  }

  return (
    <div className="">
      <main>
        <h1>teste {id}</h1>
      </main>
    </div>
  );
}
