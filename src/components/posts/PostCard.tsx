import { Post } from "@/types";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FaComment, FaHeart } from "react-icons/fa";
import ReactPlayer from "react-player";
import { usePostStore } from "@/stores/usePostStore";


type Props = {
    post: Post;
};

export default function PostCard({ post }: Props) {
    const { openModal, fetchPost } = usePostStore();

    const handleClick = async(id: number) => {
        await fetchPost(id);
        openModal();
    };

    return (
        <Card
            className="w-full relative group overflow-hidden rounded-xl cursor-pointer animate-fadeIn"
            onClick={() => handleClick(post.id)}
        >
            <CardHeader>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription className="text-xl text-gray-600 dark:text-gray-400 line-clamp-1">{post.description}</CardDescription>
            </CardHeader>

            <CardContent className="px-2 pb-1 relative">
                {/* Renderizar imagen con overlay */}
                {post.file_type.startsWith("image") ? (
                    <div className="relative w-full h-98">
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <div className="flex gap-10 text-white text-2xl items-center">
                                <div className="flex flex-col items-center hover:scale-110 transition-transform">
                                    <FaHeart />
                                    <span className="text-sm mt-1">0</span>
                                </div>
                                <div className="flex flex-col items-center hover:scale-110 transition-transform">
                                    <FaComment />
                                    <span className="text-sm mt-1">{post.commentsCount}</span>
                                </div>
                            </div>
                        </div>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${post.file}`}
                            alt={post.description || post.title}
                            fill
                            priority
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 700px"
                            className="rounded-lg"
                        />
                    </div>
                ) : post.file_type.startsWith("video") ? (
                    <div className="relative w-full h-72">
                        {/* Overlay para videos */}
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <div className="flex gap-10 text-white text-2xl items-center">
                                <div className="flex flex-col items-center hover:scale-110 transition-transform">
                                    <FaHeart />
                                    <span className="text-sm mt-1">0</span>
                                </div>
                                <div className="flex flex-col items-center hover:scale-110 transition-transform">
                                    <FaComment />
                                    <span className="text-sm mt-1">{post.commentsCount}</span>
                                </div>
                            </div>
                        </div>
                        <ReactPlayer
                            url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${post.file}`}
                            controls
                            width="100%"
                            height="100%"
                            className="rounded-lg"
                        />
                    </div>
                ) : (
                    <p className="text-sm py-4">Tipo de archivo no soportado.</p>
                )}
            </CardContent>
        </Card>
    );
}
