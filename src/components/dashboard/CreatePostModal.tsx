import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegPlusSquare, FaSmile } from "react-icons/fa";
import { Dropzone } from "./Dropzone";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { ErrorsPost } from "@/types";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";
import Spinner from "../spinner/Spinner";

export function CreatePostModal() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<ErrorsPost>({});
  const { fetchUser } = useUserStore();
  const [uploadProgress, setUploadProgress] = useState(0);

  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [activeField, setActiveField] = useState<"title" | "description" | null>(null);
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    if (activeField === "title") {
      setTitle((prevTitle) => prevTitle + emojiData.emoji);
    } else if (activeField === "description") {
      setDescription((prevDescription) => prevDescription + emojiData.emoji);
    }
    setShowPicker(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
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
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(percent);
          // Aquí puedes actualizar un estado de progreso si quieres mostrar una barra
        },
      });

      toast.success(response.data.message);

      fetchUser(user?.username);
      setIsOpen(false); // Cerrar el modal después de la creación exitosa
      setDescription("");
      setTitle("");
      setFile(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          toast.error("La solicitud tardó demasiado y fue cancelada. Intenta de nuevo.");
          return;
        }
        const responseErrors = error.response?.data?.errors;
        const generalError = error.response?.data?.error;
        if (generalError) {
          toast.error(generalError);
        }

        if (responseErrors) {
          setErrors(responseErrors);
          setTimeout(() => {
            setErrors({});
          }, 3000);
        }
      } else {
        toast.error("Ocurrió un error inesperado.");
      }
    }
    finally {
      setLoading(false);
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
          <div className="relative space-y-6">
            {/* Campo de título */}
            <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-primary transition-all">
              <input
                type="text"
                placeholder="Título"
                className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setActiveField("title")}
              />
              <button
                type="button"
                onClick={() => {
                  setShowPicker(!showPicker);
                  setActiveField("title");
                }}
                className="text-2xl text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <FaSmile />
              </button>
            </div>
            {errors?.title && <p className="text-sm text-red-500 ml-2">{errors.title}</p>}

            {/* Campo de descripción */}
            <div className="relative">
              <textarea
                placeholder="Descripción"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => setActiveField("description")}
              />
              <button
                type="button"
                onClick={() => {
                  setShowPicker(!showPicker);
                  setActiveField("description");
                }}
                className="absolute bottom-3 right-3 text-2xl text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <FaSmile />
              </button>
              {errors?.description && (
                <p className="text-sm text-red-500 mt-2 ml-2">{errors.description}</p>
              )}
            </div>

            {/* Picker de emojis */}
            {showPicker && (
              <div className="absolute bottom-16 left-0 z-50 shadow-lg rounded-xl overflow-hidden border dark:border-gray-700 bg-white dark:bg-gray-800">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <Dropzone
            onFileAccepted={(file) => setFile(file)}
            onFileRemoved={() => setFile(null)}
            acceptedFile={file}
          />

          <Button type="submit" className="w-full mt-4 cursor-pointer p-5" disabled={loading}>
          {loading ? <div className="text-sm text-gray-500 flex gap-2"><Spinner /> <p className="text-xl"> {uploadProgress}%</p> </div> : "Publicar"}

          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
