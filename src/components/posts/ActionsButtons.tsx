"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePostStore } from "@/stores/usePostStore";
import { Post } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { CreatePostModal } from "./CreatePostModal";
import { useState } from "react";

export function ActionsButtons({ post }: { post: Post }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const { closeModal } = usePostStore()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
    
        setTimeout(async () => {
            const resp = await Swal.fire({
                title: "¿Estás seguro?",
                text: "No podrás revertir esta acción",
                icon: "warning",
                showCancelButton: true,
                theme: "auto",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                allowOutsideClick: false,
            });
    
            if (!resp.isConfirmed) {
                return;
            }
    
            try {
                const response = await axiosInstance.delete(`/posts/${post.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success(response.data.message);
                closeModal();
                router.back();
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data.error || error.response?.data.message);
                }
            }
        }, 210); // 50ms es suficiente
    };
    


    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>

                <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer" variant={"outline"}>
                        Acciones
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem
                        onClick={() => {
                            setIsOpen(true); // Abre el modal
                            setIsDropdownOpen(false);
                        }}
                    >
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} className="text-red-500">
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <CreatePostModal
                post={post}
                isOpen={isOpen}
                setIsOpen={(state) => {
                    setIsOpen(state);
                }}
            />

        </>
    );
}
