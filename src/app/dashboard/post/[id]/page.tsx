"use client";

import { useEffect } from "react";
import { usePostStore } from "@/stores/usePostStore";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";
import Image from "next/image";
import Spinner from "@/components/spinner/Spinner";
import { ActionsButtons } from "@/components/posts/ActionsButtons";


export default function Page() {
  const params = useParams();
  const { id } = params;
  const { fetchPost, post, loading, error } = usePostStore();


  useEffect(() => {
    if (id) {
      fetchPost(+id);
    }
  }, [id, fetchPost]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-black">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-black">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{error}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen p-4 gap-6 bg-white dark:bg-black">

      <div className="w-full lg:w-9/12 bg-gray-100 dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden flex flex-col">

        <div className="p-6 border-b border-gray-300 dark:border-gray-700">

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center flex-1">
              {post?.title}
            </h1>
            {post && post.user_id === JSON.parse(localStorage.getItem("user")!).id && (
              <div className="ml-auto">
                <ActionsButtons post={post} />
              </div>
            )}
          </div>
          {post?.description && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">{post.description}</p>
          )}
        </div>




        <div className="flex-1 flex items-center justify-center ">
          {post?.file_type.startsWith("image") ? (
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[80vh]">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${post.file}`}
                alt={post.title || "Post image"}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 700px"
                className="rounded-lg"
              />
            </div>
          ) : post?.file_type.startsWith("video") ? (
            <div className="w-full h-full">
              <ReactPlayer
                url={`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${post.file}`}
                controls
                width="100%"
                height="100%"
                className="rounded-lg"
              />
            </div>
          ) : (
            <p className="text-white">Tipo de archivo no soportado.</p>
          )}
        </div>


      </div>

      <div className="w-full lg:w-3/12 bg-gray-100 dark:bg-zinc-800 p-6 rounded-2xl shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Comentarios</h2>

        <div className="space-y-4 flex-1 overflow-y-auto">
          <div className="border-b pb-2 border-gray-300 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Usuario 1:</strong> ¡Esto es increíble! Me encanta el contenido.
            </p>
          </div>
          <div className="border-b pb-2 border-gray-300 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Usuario 2:</strong> Buen trabajo, sigue así.
            </p>
          </div>
        </div>

        {/* Formulario de comentarios */}
        <form className="mt-6">
          <textarea
            placeholder="Escribe un comentario..."
            className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none dark:bg-zinc-700 dark:text-white dark:border-gray-600"
          />
          <button
            type="submit"
            className="mt-3 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Comentar
          </button>
        </form>
      </div>
    </div>
  );
}
