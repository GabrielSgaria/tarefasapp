'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TextArea } from "./text-area";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { BiTrash } from "react-icons/bi";

interface CommentProps {
    id: string;
    comment: string;
    taskId: string;
    user: string;
    name: string;
}

interface FoFormCommentProps {
    sessionEmail: string | null | undefined,
    sessionName: string | null | undefined,
    idTask: string;
}

export function FormComment({ sessionEmail, sessionName, idTask }: FoFormCommentProps) {

    const [comments, setComments] = useState<CommentProps[]>([]);

    async function handleComment(event: FormEvent) {
        event.preventDefault();
        if (input === "") return;
        if (!sessionEmail || !sessionName) console.log('Não tem sessão ativa');

        try {
            const docRef = await addDoc(collection(db, "comments"), {
                comment: input,
                created: new Date(),
                user: sessionEmail,
                name: sessionName,
                taskId: idTask,
            });

            const data = {
                id: docRef.id,
                comment: input,
                user: sessionEmail || "",
                name: sessionName || "",
                taskId: idTask,
            }

            setComments((oldItems) => [...oldItems, data])
            setInput("");

        } catch (err) {
            console.log(err);
            alert("Ocorreu um erro ao enviar o comentário. Por favor, tente novamente mais tarde.");
        }
    }

    useEffect(() => {
        async function fetchComments() {
            const q = query(collection(db, "comments"), where("taskId", "==", idTask));
            const snapshotComments = await getDocs(q);

            let commentsArray: CommentProps[] = [];

            snapshotComments.forEach((doc) => {
                commentsArray.push({
                    id: doc.id,
                    comment: doc.data().comment,
                    user: doc.data().user,
                    name: doc.data().name,
                    taskId: doc.data().taskId
                });
            });

            setComments(commentsArray);
        }

        fetchComments();
    }, [idTask]);

    const [input, setInput] = useState("");
    return (
        <div className="w-full">
            <section className="container mx-auto w-full my-[18px] max-w-[1024px]">
                <h2 className="my-[14px] font-bold text-3xl ">Comentário</h2>
                <form onSubmit={handleComment}>
                    <TextArea
                        value={input}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                            setInput(event.target.value)
                        }
                        placeholder="Digite o seu comentário..."
                    />
                    <button
                        type="submit"
                        disabled={!sessionEmail || !sessionName}
                        className="disabled:bg-blue-400 disabled:cursor-not-allowed w-full py-[12px] bg-blue-600 rounded-xl text-zinc-50 text-xl cursor-pointer mt-5">Enviar Comentário</button>
                </form>
            </section>

            <section className="container mx-auto mt-[40px] flex flex-col justify-center items-center max-w-[1024px]">
                <h2 className="mb-[14px] font-bold text-3xl">Todos os comentários</h2>
                {comments.length === 0 && (
                    <span>Nenhum comentário foi encontrado</span>
                )}
                {comments.map((item) => (
                    <article className="max-w-[1200px] p-[14px] rounded-xl border border-zinc-400 border-solid w-full mb-[14px]" key={item.id}>
                        <div className="flex items-center">
                            <label className="bg-zinc-200 py-[4px] px-[8px] mr-2 rounded-xl">{item.name}</label>
                            {item.user === sessionEmail && (
                                <button className="border-0 bg-transparent cursor-pointer">
                                    <BiTrash size={18} color="red" />
                                </button>
                            )}
                        </div>
                        <p className="mt-4 whitespace-pre-wrap">{item.comment}</p>
                    </article>
                ))}
            </section>
        </div>
    )
}