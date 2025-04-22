"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUpload, FiX } from "react-icons/fi"
import Image from "next/image" // Importamos Image de Next.js

interface DropzoneProps {
  onFileAccepted: (file: File) => void
  onFileRemoved: () => void
  acceptedFile?: File | null
}

export function Dropzone({ onFileAccepted, onFileRemoved, acceptedFile }: DropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      onFileAccepted(file)
      // Crear preview para imágenes
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => setPreview(reader.result as string)
        reader.readAsDataURL(file)
      }
    }
  }, [onFileAccepted])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi'],
    },
    maxFiles: 1
  })

  const removeFile = () => {
    onFileRemoved()
    setPreview(null)
  }

  return (
    <div className="space-y-2">
      {!acceptedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20" : "border-gray-300 dark:border-gray-600"
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isDragActive ? (
              "Suelta el archivo aquí"
            ) : (
              <>
                Arrastra y suelta archivos aquí, o haz clic para seleccionar
                <br />
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  (Imágenes o videos)
                </span>
              </>
            )}
          </p>
        </div>
      ) : (
        <div className="relative group">
          {preview ? (
            <div className="relative">
            <div className="w-full h-72 relative rounded-lg overflow-y-auto">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized={true} // Necesario para imágenes locales/blobs
              />
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
          ) : (
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 flex items-center justify-between">
              <span className="truncate">{acceptedFile.name}</span>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}