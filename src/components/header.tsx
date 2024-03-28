"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FiLoader, FiLock, FiLogOut } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full h-16 bg-zinc-950 items-center justify-center flex">
      <section className="px-4 py-0 w-full max-w-[1024px] items-center justify-between flex">
        <nav className="flex items-center ">
          <Link href="/" className="text-zinc-50 text-xl sm:text-3xl">
            <h1 className="">
              Tarefas<span className="text-red-700 pl-1">+</span>
            </h1>
          </Link>
          {status === "authenticated" && (
            <Link
              href="/dashboard"
              className="text-zinc-950 bg-zinc-300 text-xs font-bold sm:text-sm py-1 px-2 rounded-md mx-4 duration-300 hover:bg-zinc-50 hover:font-bold transition-all"
            >
              Meu Painel
            </Link>
          )}
        </nav>

        {status === "loading" && (
          <button className="text-zinc-50 bg-transparent px-8 py-2 rounded-3xl border-2 border-solid border-zinc-50 hover:scale-105 transition-all duration-300 hover:font-bold hover:text-zinc-950 hover:bg-zinc-50">
            <FiLoader size={26} className="animate-spin" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button
            className="flex gap-2 text-zinc-50 bg-transparent px-8 py-2 rounded-3xl border-2 border-solid border-zinc-50 hover:scale-105 transition-all duration-300 hover:font-bold hover:text-zinc-950 hover:bg-zinc-50"
            onClick={handleLogin}
          >
            <FiLock size={20} /> Acessar
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-center gap-4 ">
            <Link
              href="/dashboard"
              className="text-xs sm:text-sm text-zinc-50 font-normal bg-transparent px-4 sm:px-8 py-2 rounded-3xl border-2 border-solid border-zinc-50 hover:scale-105 transition-all duration-300 hover:font-bold hover:text-zinc-950 hover:bg-zinc-50"
            >
              Olá {data?.user.name}
            </Link>
            <button
              onClick={handleLogout}
              className="text-zinc-50 bg-transparent px-4 py-2 rounded-3xl border-2 border-solid border-zinc-50 hover:scale-105 transition-all duration-300 hover:font-bold hover:text-zinc-950 hover:bg-zinc-50"
            >
              <FiLogOut className="size-4 sm:size-5" />
            </button>
          </div>
        )}
      </section>
    </header>
  );
}
