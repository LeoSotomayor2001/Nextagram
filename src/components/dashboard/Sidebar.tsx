"use client";
import { roboto } from "@/fonts";
import { ThemeToggle } from "../ThemeToggle";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";

import UserPortrait from "./UserProtrait";

import LogoutButton from "./LogoutButton";
import { CreatePostModal } from "../posts/CreatePostModal";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";

export default function Sidebar() {
    const userData = JSON.parse(localStorage.getItem('user')!);
    const username = userData.username
    const { user, fetchUser } = useUserStore();
    useEffect(() => {
        fetchUser(username);
    }, [username, fetchUser]);
    return (
        <aside className="md:w-64 md:border-gray-200 border-r w-full">
            <header className="flex justify-between items-center p-4">
                <Link href={"/dashboard"} className={`${roboto.className} text-2xl md:text-3xl mb-4 font-bold text-gray-900 dark:text-white`}>
                    Nextagram
                </Link>
                <ThemeToggle />
            </header>
            <nav className="p-4">
                <ul className="space-y-1">
                    <li>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 w-full p-3 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 dark:hover:text-sky-500 rounded-md transition-colors"
                        >
                            <IoHome className="size-6" />
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/search"
                            className="flex items-center gap-2 w-full p-3 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 dark:hover:text-sky-500 rounded-md transition-colors"
                        >
                            <FaSearch className="size-6" />
                            Busqueda
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/messages"
                            className="flex items-center gap-2 w-full p-3 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 dark:hover:text-sky-500 rounded-md transition-colors"
                        >
                            <LuMessageCircleMore className="size-6" />
                            Mensajes
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/notifications"
                            className="flex items-center gap-2 w-full p-3 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 dark:hover:text-sky-500 rounded-md transition-colors"
                        >
                            <FaRegHeart className="size-6" />
                            Notificaciones
                        </Link>
                    </li>
                    <li>
                        <CreatePostModal />
                    </li>
                    <li>
                        <Link
                            href={`/dashboard/profile/${user.username}`} // Reemplaza con el valor dinámico del usuario logueado
                            className="flex items-center gap-2 w-full p-3 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 dark:hover:text-sky-500 rounded-md transition-colors"
                        >
                            <UserPortrait styles="w-6 h-6" image={user.image} />
                            Perfil
                        </Link>
                    </li>

                    <li>
                        <LogoutButton />
                    </li>

                </ul>
            </nav>
        </aside>
    )
}
