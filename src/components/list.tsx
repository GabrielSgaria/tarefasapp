"use client";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebaseConnection";
import { FiShare2 } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import Link from "next/link";

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

export function List({ userEmail }: { userEmail: string | null | undefined }) {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  useEffect(() => {
    async function loadTarefas() {
      const tarefasRef = collection(db, "tarefas");
      const q = query(
        tarefasRef,
        orderBy("created", "desc"),
        where("user", "==", userEmail)
      );

      onSnapshot(q, (snapshot) => {
        let lista = [] as TaskProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            created: doc.data().created,
            user: doc.data().user,
            public: doc.data().public,
          });
        });
        setTasks(lista);
      });
    }
    loadTarefas();
  }, [userEmail]);

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );
    alert("URL Copiada com sucesso!");
  }
  async function handleDeleteTask(id: string) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  }

  return (
    <>
      {tasks.map((item) => (
        <article
          key={item.id}
          className="mb-4 leading-6 flex flex-col border-2 border-solid border-zinc-300 rounded-xl p-4 items-start"
        >
          {item.public && (
            <div className="flex items-center justify-center mb-2">
              <label className="bg-blue-600 py-[2px] px-[6px] text-zinc-50 rounded-md text-sm">
                PUBLICO
              </label>
              <button className="bg-transparent mx-2 cursor-pointer">
                <FiShare2
                  className="size-5 text-blue-600"
                  onClick={() => handleShare(item.id)}
                />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between w-full">
            {item.public ? (
              <Link href={`/task/${item.id}`}>
                <p className="whitespace-pre-wrap">{item.tarefa}</p>
              </Link>
            ) : (
              <p className="whitespace-pre-wrap">{item.tarefa}</p>
            )}

            <button className="">
              <FaTrashCan
                className="text-red-600 size-5 bg-transparent mx-2"
                onClick={() => handleDeleteTask(item.id)}
              />
            </button>
          </div>
        </article>
      ))}
    </>
  );
}
