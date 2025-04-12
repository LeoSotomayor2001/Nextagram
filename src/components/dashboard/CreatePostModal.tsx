"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaRegPlusSquare } from "react-icons/fa"
import { Dropzone } from "./Dropzone"


export function CreatePostModal() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
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
        <div className="py-4 space-y-4">
          <input 
            type="text" 
            placeholder="Título" 
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 dark:bg-gray-800 dark:text-white" 
            name="title"
          />
          
          <textarea 
            placeholder="Descripción" 
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 dark:bg-gray-800 dark:text-white" 
            name="description"
            rows={4}
          />
          
          <Dropzone 
            onFileAccepted={(file) => setFile(file)}
            onFileRemoved={() => setFile(null)}
            acceptedFile={file}
          />
          
          <Button 
            type="submit" 
            className="w-full mt-4"
            disabled={!file} // Opcional: deshabilitar si no hay archivo
          >
            Publicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}