"use client";
import { roboto } from "@/fonts";
import { ThemeToggle } from "../ThemeToggle";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { FaRegPlusSquare, FaSearch } from "react-icons/fa";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { Button } from "../ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserPortrait from "./UserProtrait";

export default function Sidebar() {
    const user = JSON.parse(localStorage.getItem('user')!);
    const router=useRouter()
    const logout= async () =>{
        try{
            const token=localStorage.getItem('token')
            const response = await axiosInstance.post(`/logout`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            localStorage.clear()
            toast.success(response.data.message)
            router.push('/auth/login')
        }
        catch(error:unknown){
            console.log(error)
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.error || 'Error al cerrar sesión')
                if(error.response?.data.error==='Sesión expirada'){
                    localStorage.clear()
                    router.push('/auth/login')
                }
            }
        }

    }
    return (
        <aside className="w-64 border-gray-200 border-r">
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
                        <Link
                            href="/dashboard/create"
                            className="flex items-center gap-2 w-full p-3 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 dark:hover:text-sky-500 rounded-md transition-colors"
                        >
                            <FaRegPlusSquare className="size-6" />
                            Crear
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/dashboard/profile/${user.username}`} // Reemplaza con el valor dinámico del usuario logueado
                            className="flex items-center gap-2 w-full p-3 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 dark:hover:text-sky-500 rounded-md transition-colors"
                        >
                            <UserPortrait styles="w-6 h-6" image={user.image}/>
                            Perfil
                        </Link>
                    </li>

                    <li>
                        <Button
                            variant={'destructive'}
                            className="w-full cursor-pointer "
                            onClick={logout}
                        >
   
                            Cerrar sesión
                        </Button>
                    </li>

                </ul>
            </nav>
        </aside>
    )
}
