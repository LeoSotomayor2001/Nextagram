import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaSmile } from "react-icons/fa";

import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { ErrorsPost, Post } from "@/types";
import Spinner from "../spinner/Spinner";
import { Dropzone } from "./Dropzone";
import handleAxiosError from "@/utils/axiosError";
import { useUserStore } from "@/stores/useUserStore";
import { usePostStore } from "@/stores/usePostStore";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Progress } from "../ui/progress";
import { playSound } from "@/utils/playsound";

interface CreatePostModalProps {
  post?: Post; // Si se pasa un post, estamos en modo edición
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  onSuccess?: () => void; // Callback opcional para actualizar la lista de posts
}

export function CreatePostModal({
  post,
  isOpen,
  setIsOpen,
}: CreatePostModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const [errors, setErrors] = useState<ErrorsPost>({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const { fetchProfile } = useUserStore();
  const { fetchPost } = usePostStore();
  const [activeField, setActiveField] = useState<"title" | "description" | null>(null);

  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
    }
  }, [post]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    if (activeField === "title") {
      setTitle((prevTitle) => prevTitle + emojiData.emoji);
    } else if (activeField === "description") {
      setDescription((prevDescription) => prevDescription + emojiData.emoji);
    }
    setShowPicker(false); // Ocultar el picker después de seleccionar un emoji
  };

 
  const handleClickOutside = (event: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as Node)
    ) {
      setShowPicker(false); 
    }
  };

  useEffect(() => {
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")!);
    const url = post
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${post.id}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;


    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append('user_id', user.id);
    if (file) {
      formData.append("file", file);
    }

    if (!title || !description) {
      toast.error("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }
    try {
      const response = await axiosInstance.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percent);
        },
      });

      toast.success(response.data.message);
      playSound('/notification3.mp3')
      fetchProfile(user?.username);
      if (post) {
        fetchPost(post.id)
      }
      setIsOpen(false);
      setDescription("");
      setTitle("");
      setFile(null);

    } catch (error) {
      handleAxiosError<ErrorsPost>(error, setErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[95vw] sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {post ? "Editar publicación" : "Crear nueva publicación"}
          </DialogTitle>
        </DialogHeader>
        <form className="py-4 space-y-4" onSubmit={handleSubmit}>
          <div className="relative space-y-6">
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
            {errors?.title && (
              <p className="text-sm text-red-500 ml-2">{errors.title}</p>
            )}
            <div>

              <DialogDescription>

                <textarea
                  placeholder="Descripción"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={() => setActiveField("description")}
                />
              </DialogDescription>

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
            {/* Emoji Picker */}
            {showPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute z-50 -top-15 right-15 shadow-lg rounded-xl overflow-hidden border dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          {!post ? (

            <Dropzone
              onFileAccepted={(file) => setFile(file)}
              onFileRemoved={() => setFile(null)}
              acceptedFile={file}
            />

          ) :
            <p className="text-center text-gray-300">En edición no puedes cambiar el archivo</p>
          }


          <Button type="submit" className="w-full mt-4 cursor-pointer p-5" disabled={loading}>
            {loading ? (
              <div className="text-sm text-gray-500 flex gap-2">
                <Spinner /> <p className="text-xl"> {uploadProgress}%</p>
              </div>
            ) : post ? "Guardar cambios" : "Publicar"}
          </Button>
          {loading && (
            <Progress value={uploadProgress} />

          )}

        </form>
      </DialogContent>
    </Dialog>
  );
}
