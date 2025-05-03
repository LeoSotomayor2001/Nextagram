"use client";

import UserPortrait from "@/components/dashboard/UserProtrait";
import PostCard from "@/components/posts/PostCard";
import Spinner from "@/components/spinner/Spinner";
import { useUserStore } from "@/stores/useUserStore";
import { Post } from "@/types";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardPage() {
  const { fetchPosts, dashboardPosts, loading } = useUserStore();

  useEffect(() => {

    fetchPosts()
  }, [fetchPosts])
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }
  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
    {dashboardPosts.length === 0 ? (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        No hay publicaciones
      </div>
    ) : (
      dashboardPosts.map((post: Post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-4"
        >
          <header className="mb-3 flex items-center gap-3">
            <Link
              href={`/dashboard/profile/${post.username}`}
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <UserPortrait
                styles="w-10 h-10 rounded-full shadow-md object-cover"
                image={post.userImage}
              />
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {post.username}
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {post.created}
              </p>
            </Link>
          </header>
          <PostCard post={post} />
        </div>
      ))
    )}
  </div>
  
  )
}
