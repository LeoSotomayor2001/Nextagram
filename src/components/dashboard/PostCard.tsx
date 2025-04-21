import { Post } from "@/types";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FaComment, FaHeart } from "react-icons/fa";
import ReactPlayer from 'react-player'

type Props = {
    post: Post;
};

export default function PostCard({ post }: Props) {
    return (
        <Card className="w-full relative group overflow-hidden rounded-xl cursor-pointer">
            <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
            </CardHeader>

            <CardContent className="px-2 pb-1 relative">
                {post.file_type.startsWith("image") ? (
                    <div className="relative w-full h-72">
                        {/* Overlay SOLO para imágenes */}
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <div className="flex gap-10 text-white text-2xl items-center">
                                <div className="flex flex-col items-center hover:scale-110 transition-transform">
                                    <FaHeart />
                                    <span className="text-sm mt-1">0</span>
                                </div>
                                <div className="flex flex-col items-center hover:scale-110 transition-transform">
                                    <FaComment />
                                    <span className="text-sm mt-1">0</span>
                                </div>
                            </div>
                        </div>

                        {/* Imagen */}
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${post.file}`}
                            alt={post.description || post.title}
                            fill
                            priority
                            className="object-cover rounded-lg"
                        />
                    </div>
                ) : post.file_type.startsWith("video") ? (
                    <div className=" w-full h-72">
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
