import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactPlayer from "react-player";
import Image from "next/image";
import { usePostStore } from "@/stores/usePostStore";
import Spinner from "../spinner/Spinner";

export default function PostModal() {
    const { isOpen, post, closeModal, loading } = usePostStore();

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="w-full max-w-4xl h-[90vh] flex flex-col p-0 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        {loading ? "Cargando..." : post?.title}
                    </DialogTitle>
                </DialogHeader>

                {/* Contenido multimedia */}
                <div className="flex-1 bg-black flex items-center justify-center relative">
    {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
            <Spinner />
        </div>
    ) : post?.file_type.startsWith("image") ? (
        <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${post.file}`}
            alt={post.title}
            fill // Esto hace que la imagen ocupe todo el div (Next.js Image prop)
            className="rounded-none"
        />
    ) : post?.file_type.startsWith("video") ? (
        <div className="w-full h-full flex items-center justify-center">
            <ReactPlayer
                url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${post.file}`}
                controls
                width="100%"
                height="100%"
                className="rounded-md max-h-[65vh]"
            />
        </div>
    ) : (
        <p className="text-sm text-white">Tipo de archivo no soportado.</p>
    )}
</div>


                {/* Comentarios */}
                {!loading && (
                    <div className="max-h-[35vh] overflow-y-auto bg-gray-100 dark:bg-gray-900 px-6 py-5">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Comentarios</h2>

                        <div className="space-y-4">
                            <div className="border-b border-gray-300 dark:border-gray-700 pb-2">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Usuario 1:</strong> Esto es increíble. Me encanta el contenido.
                                </p>
                            </div>
                            <div className="border-b border-gray-300 dark:border-gray-700 pb-2">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Usuario 2:</strong> Muy buen trabajo. ¡Sigue así!
                                </p>
                            </div>
                        </div>

                        {/* Formulario */}
                        <form className="mt-6">
                            <textarea
                                placeholder="Escribe un comentario..."
                                className="w-full h-24 p-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                            />
                            <button
                                type="submit"
                                className="mt-3 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Comentar
                            </button>
                        </form>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
