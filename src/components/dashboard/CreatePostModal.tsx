import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegPlusSquare } from "react-icons/fa";
import { Dropzone } from "./Dropzone";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { ErrorsPost } from "@/types";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";

export function CreatePostModal() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<ErrorsPost>({});
  const { fetchUser } = useUserStore();
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura del modal

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")!);
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("user_id", user?.id);
    if (file) {
      formData.append("file", file);
    }
    
    try {
      const response = await axiosInstance.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      toast.success(response.data.message);
      fetchUser(user?.username as string);
      setIsOpen(false); // Cerrar el modal después de la creación exitosa
      setDescription("");
      setTitle("");
      setFile(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data.errors);
        setTimeout(() => {
          setErrors({});
        }, 3000);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer flex items-center gap-2 w-full p-6 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 dark:hover:text-sky-500 rounded-md transition-colors justify-start"
        >
          <FaRegPlusSquare className="size-6" />
          Crear
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear nueva publicación</DialogTitle>
        </DialogHeader>
        <form className="py-4 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 dark:bg-gray-800 dark:text-white"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
          <textarea
            placeholder="Descripción"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 dark:bg-gray-800 dark:text-white"
            name="description"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={description}
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
          <Dropzone
            onFileAccepted={(file) => setFile(file)}
            onFileRemoved={() => setFile(null)}
            acceptedFile={file}
          />

          <Button type="submit" className="w-full mt-4 cursor-pointer">
            Publicar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
