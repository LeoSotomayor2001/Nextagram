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
import { CreatePostModal } from "./CreatePostModal";
import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog"; // Importa el nuevo componente
import { FiSettings } from "react-icons/fi";

export function ActionsButtons({ post }: { post: Post }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { closeModal } = usePostStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const token = localStorage.getItem("token");

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
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="cursor-pointer" variant={"outline"}>
          <FiSettings className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-90' : ''}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(true);
              setIsDropdownOpen(false);
            }}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setShowDeleteDialog(true);
              setIsDropdownOpen(false);
            }}
            className="text-red-500 focus:text-red-500"
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreatePostModal
        post={post}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="¿Eliminar publicación?"
        description="Esta acción no se puede deshacer. La publicación se eliminará permanentemente."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
        isProcessing={isDeleting}
        confirmVariant="destructive"
      />
    </>
  );
}