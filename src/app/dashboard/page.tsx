"use client";

import FollowButton from "@/components/dashboard/FollowButton";
import UserPortrait from "@/components/dashboard/UserProtrait";
import PostCard from "@/components/posts/PostCard";
import Spinner from "@/components/spinner/Spinner";
import { useUserStore } from "@/stores/useUserStore";
import { Post } from "@/types";
import Link from "next/link";
import { useEffect } from "react";

export default function DashboardPage() {
  const { fetchPosts, dashboardPosts, loading, suggesteds, fetchSuggesteds } = useUserStore();

  useEffect(() => {
    fetchSuggesteds();
    fetchPosts();
  }, [fetchPosts, fetchSuggesteds]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-8 mx-auto mt-10 px-4">
      {/* Contenedor principal centrado */}
      <div className="flex max-w-5xl w-full gap-8">
        {/* Sección principal de posts - ahora con margen izquierdo */}
        <section className="flex-1 max-w-2xl space-y-6 ml-auto">
          {dashboardPosts.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No hay publicaciones
            </p>
          ) : (
            dashboardPosts.map((post: Post) => (
              <div
                key={post.id}
                className="border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm"
              >
                <header className="mb-3 flex items-center gap-3 p-2">
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
        </section>

        {/* Sección de sugerencias (lado derecho) */}
        <aside className="w-80 hidden lg:block sticky top-20 h-fit mr-auto">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Sugerencias para ti
            </h2>

            {suggesteds.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No hay sugerencias disponibles
              </p>
            ) : (
              <ul className="space-y-4">
                {suggesteds.map((user) => (
                  <li key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <Link
                      href={`/dashboard/profile/${user.username}`}
                      className="flex items-center gap-3 hover:opacity-90 transition-opacity flex-1"
                    >
                      <UserPortrait
                        styles="w-10 h-10 rounded-full shadow-md object-cover"
                        image={user.image}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {user.username}
                        </p>
                      </div>
                    </Link>
                    <FollowButton user={user} inProfile={false} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}