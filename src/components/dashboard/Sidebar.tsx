"use client";
import { roboto } from "@/fonts";
import { ThemeToggle } from "../ThemeToggle";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { LuMessageCircleMore } from "react-icons/lu";

import UserPortrait from "./UserProtrait";

import LogoutButton from "./LogoutButton";
import { CreatePostModal } from "../posts/CreatePostModal";

import {  useState } from "react";
import PostModal from "../posts/PostModal";
import SearchDrawer from "./SearchDrawer";
import NotificationDrawer from "./NotificationDrawer";


export default function Sidebar() {
    const userData = JSON.parse(localStorage.getItem('user')!);
    
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

    return (
        <aside className="md:w-72 md:border-gray-200 border-r w-full">
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
                    <li >
                        <SearchDrawer />
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
                        <NotificationDrawer />
                    </li>
                    <li>
                        <button
                            className="cursor-pointer flex items-center gap-2 w-full p-3 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 dark:hover:text-sky-500 rounded-md transition-colors"
                            onClick={() => setIsCreatePostOpen(true)}
                        >
                            <FaRegPlusSquare className="size-6" />
                            Crear
                        </button>
                        {/* Modal de creación */}
                        <CreatePostModal
                            isOpen={isCreatePostOpen}
                            setIsOpen={setIsCreatePostOpen}
                        />
                    </li>
                    <li>
                        <Link
                            href={`/dashboard/profile/${userData.username}`}
                            className="flex items-center gap-2 w-full p-3 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 dark:hover:text-sky-500 rounded-md transition-colors"
                        >
                            <UserPortrait styles="w-6 h-6" image={userData.image} />
                            Perfil
                        </Link>
                    </li>

                    <li>
                        <LogoutButton />
                    </li>

                </ul>
            </nav>
            <PostModal />
        </aside>
    )
}
