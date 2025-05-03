"use client";

import { useEffect } from "react";
import { usePostStore } from "@/stores/usePostStore";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";
import Image from "next/image";
import Spinner from "@/components/spinner/Spinner";
import { ActionsButtons } from "@/components/posts/ActionsButtons";
import PostComments from "@/components/posts/PostComments";
import LikeButton from "@/components/posts/LikeButton";
import { isCurrentUser } from "@/utils/utils";


export default function Page() {
  const params = useParams();
  const { id } = params;
  const { fetchPost, post, loading, error } = usePostStore();


  useEffect(() => {
    if (id) {
      fetchPost(+id);
      if(post?.title) {
        document.title = `${post?.title}`;
      }
    }
  }, [id, fetchPost, post?.title]);

  if (loading || !post) {
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

      <div className="w-full lg:w-8/12 bg-gray-100  dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden flex flex-col">

        <div className="p-6 border-b border-gray-300 dark:border-gray-700">

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center flex-1">
              {post?.title}
            </h1>
            {post && isCurrentUser(post.user_id) && (
              <div className="ml-auto">
                <ActionsButtons post={post} />
              </div>
            )}
          </div>
          <div className="mt-2 max-h-[100px] overflow-y-auto">
            <p className="text-gray-600 dark:text-gray-400 break-words">
              {post?.description}
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[80vh]">

          {post?.file_type.startsWith("image") ? (
            <div className="relative w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[80vh] flex items-center justify-center">

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


          <LikeButton post={post} />
      </div>
      {post?.comments && (
        <PostComments styles="w-full lg:w-4/12 bg-gray-100 dark:bg-gray-900 p-6 rounded-2xl shadow-md flex flex-col" comments={post?.comments} postId={post.id} />
      )}

    </div>
  );
}
