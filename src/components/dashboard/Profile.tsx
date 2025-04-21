'use client'
import { useParams } from 'next/navigation'
import { Button } from "../ui/button"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '../spinner/Spinner'

import { Post,  } from '@/types'
import Link from 'next/link'
import UserPortrait from './UserProtrait'
import PostCard from './PostCard'
import LogoutButton from './LogoutButton'
import { useUserStore } from '@/stores/useUserStore'

export default function Profile() {
    const params = useParams<{ username: string }>()
    const username = params.username
    const { user, posts, loading, error, fetchUser } = useUserStore();
    const router = useRouter()
    useEffect(() => {
        fetchUser(username); // Llamar la función global al montar el componente
      }, [username]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        )
    }
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <p className="text-red-500 text-lg">{error}</p>
                <div className='flex gap-2 w-46 '>
                    <Button onClick={() => router.push('/dashboard')} className='cursor-pointer'>
                        Volver al dashboard
                    </Button>
                    <LogoutButton />

                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>No se encontró el usuario</p>
            </div>
        )
    }


    return (
        <div className="my-5">
            <div className="flex items-center justify-center gap-5">
                <UserPortrait image={user.image} />
                <div>
                    <div className="flex gap-3 justify-center items-center">
                        <h2 className="text-2xl text-black dark:text-white">
                            {user.name + ' ' + user.lastname} (@{user.username})
                        </h2>
                        <div className="flex gap-4 my-3">
                            <Link href={`/dashboard/profile/edit`}>
                                <Button variant="outline" size="lg" className="cursor-pointer">
                                    Editar perfil
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="cursor-pointer">
                                Ver archivo
                            </Button>
                        </div>
                    </div>
                    <section className="mt-3">
                        <ul className="flex gap-4">
                            <li>Publicaciones</li>
                            <li>Seguidores</li>
                            <li>Seguidos</li>
                        </ul>
                    </section>
                </div>
            </div>

            <section className="w-full mx-auto py-10 px-6">
                <h2 className="text-3xl text-black dark:text-white text-center mb-8">Publicaciones</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                    {posts?.map((post: Post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </section>


        </div>
    )
}