import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { DialogTitle } from "../ui/dialog";
import { FaSearch } from "react-icons/fa";
import {useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { User } from "@/types";
import Link from "next/link";
import UserPortrait from "./UserProtrait";
import { toast } from "react-toastify";
export default function SearchDrawer() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const handleSearch = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.info("No tienes permisos para acceder a esta función.");
            return;
        }
        if (searchQuery.trim() === "") {
            toast.info("Por favor, ingresa un término de búsqueda.");
            return;
        }
        try {
            const response = await axiosInstance.post("/users/search", {
                query: searchQuery
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsers(response.data.users);
        } catch (error) {
            console.error("Error al buscar el usuario:", error);

        }
    };


    return (
        <Drawer open={isSearchOpen} onOpenChange={setIsSearchOpen} >
            <DrawerTrigger asChild>
                <button
                    onClick={() => setIsSearchOpen(true)}
                    className="cursor-pointer flex items-center gap-2 w-full p-3 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 rounded-md transition-colors"
                >
                    <FaSearch className="size-6" />
                    Busqueda
                </button>
            </DrawerTrigger>
            <DrawerContent className="w-full md:w-72 h-screen bg-white dark:bg-gray-900 p-6   top-0 shadow-lg">
                <DialogTitle className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    Buscar perfil en Nextagram
                </DialogTitle>
                <input
                    type="text"
                    placeholder="Escribe para buscar..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    onClick={handleSearch}
                >
                    Buscar
                </button>

                <section >
                    {users && users.length > 0 ? (
                        <ul className="mt-4 space-y-2">
                            {users.map((user) => (
                                <li key={user.id} className="p-1 ">
                                    <Link
                                        href={`/dashboard/profile/${user.username}`}
                                        className="mb-2 flex gap-2 items-center hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-md transition-colors"
                                    >
                                        <UserPortrait styles="w-6 h-6 md:w-8 md:h-8 rounded-full" image={user.image} />
                                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                            {user.name + ' '+ user.lastname + ' ('+ user.username + ')'}
                                        </p>
                                        
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4 text-gray-500 dark:text-gray-400">No se encontraron resultados.</p>
                    )}
                </section>
            </DrawerContent>

        </Drawer>

    )
}
