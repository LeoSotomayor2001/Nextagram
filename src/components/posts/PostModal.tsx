import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactPlayer from "react-player";
import Image from "next/image";
import { usePostStore } from "@/stores/usePostStore";
import Spinner from "../spinner/Spinner";
import Link from "next/link";
import PostComments from "./PostComments";

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
                    {!loading && (
                        <Link href={`/dashboard/post/${post?.id}`} className="float-right">
                            Ir a la publicación
                        </Link>

                    )}
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
                {!loading && post?.comments && (
                    <PostComments comments={post.comments} />
                )}



            </DialogContent>
        </Dialog>
    );
}
