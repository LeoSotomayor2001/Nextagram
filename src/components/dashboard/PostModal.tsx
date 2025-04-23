import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactPlayer from "react-player";
import Image from "next/image";
import { usePostStore } from "@/stores/usePostStore";


export default function PostModal() {
    const { isOpen, post, closeModal } = usePostStore();
    if (!post){
        console.log("No hay post")
        return null
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="w-full h-[90vh] max-w-4xl flex flex-col gap-4 p-0 overflow-hidden">
                {/* Header */}
                <DialogHeader className="px-6 pt-6">
                    <DialogTitle className="text-2xl font-bold">{post.title}</DialogTitle>
                </DialogHeader>

                {/* Archivo */}
                <div className="flex-1 bg-black flex items-center justify-center rounded-lg mx-6">
                    {post.file_type.startsWith("image") ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${post.file}`}
                            alt={post.title}
                            width={800}
                            height={600}
                            className="object-contain max-h-full max-w-full rounded-lg"
                        />
                    ) : post.file_type.startsWith("video") ? (
                        <ReactPlayer
                            url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${post.file}`}
                            controls
                            width="100%"
                            height="100%"
                            className="max-h-full rounded-lg"
                        />
                    ) : (
                        <p className="text-sm text-white">Tipo de archivo no soportado.</p>
                    )}
                </div>

                {/* Comentarios */}
                <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 px-6 py-4 rounded-t-2xl">
                    <h2 className="text-lg font-semibold mb-4 dark:text-white">Comentarios</h2>

                    {/* Lista de comentarios */}
                    <div className="space-y-4">
                        <div className="border-b pb-2 border-gray-300 dark:border-gray-700">
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Usuario 1:</strong> Esto es increíble. Me encanta el contenido.
                            </p>
                        </div>
                        <div className="border-b pb-2 border-gray-300 dark:border-gray-700">
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Usuario 2:</strong> Muy buen trabajo. ¡Sigue así!
                            </p>
                        </div>
                    </div>

                    {/* Formulario para añadir comentarios */}
                    <form className="mt-6">
                        <textarea
                            placeholder="Escribe un comentario..."
                            className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        />
                        <button
                            type="submit"
                            className="mt-3 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Comentar
                        </button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
