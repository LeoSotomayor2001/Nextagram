'use client'
import { useParams } from 'next/navigation'
import { Button } from "../ui/button"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '../spinner/Spinner'

import { Post, } from '@/types'
import Link from 'next/link'
import UserPortrait from './UserProtrait'
import PostCard from '../posts/PostCard'
import LogoutButton from './LogoutButton'
import { useUserStore } from '@/stores/useUserStore'
import { toast } from 'react-toastify'
import axiosInstance from '@/utils/axiosInstance'

export default function Profile() {
    const params = useParams<{ username: string }>()
    const username = params.username
    const { user, posts, loading, error, fetchProfile,isFollowing } = useUserStore();
    const router = useRouter()
    useEffect(() => {
        fetchProfile(username);
    }, [username, fetchProfile]);
    

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

    const handleFollow = async () => {
        if (user.isMe) {
            toast.info('No puedes seguirte a ti mismo');
            return;
        }
    
        const token = localStorage.getItem('token');
        try {
            const response = await axiosInstance.post(`${user.username}/follow`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            toast.success(response.data.message);
            fetchProfile(username); // Actualiza el perfil después de seguir
        } catch (error) {
            console.error(`Error al ${user.isFollowing ? 'dejar de seguir' : 'seguir'} al usuario:`, error);
            toast.error(`Error al ${user.isFollowing ? 'dejar de seguir' : 'seguir'} al usuario`);
        }
    };

    const handleDeleteFollow = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axiosInstance.delete(`${user.username}/follow`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            toast.success(response.data.message);
            fetchProfile(username); 
        } catch (error) {
            console.error('Error al dejar de seguir al usuario:', error);
            toast.error('Error al dejar de seguir al usuario');
        }
    };
    
    

    return (
        <div className="my-5">

            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 p-4">
                <UserPortrait image={user.image} />

                <div className="text-center md:text-left w-full md:w-auto">
                    <div className="flex flex-col gap-4 md:gap-3 md:flex-row md:items-center md:justify-start">
                        <h2 className="text-2xl text-black dark:text-white">
                            {user.name + ' ' + user.lastname} (@{user.username})
                        </h2>
                        {user.isMe ? (
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href={`/dashboard/profile/edit`}>
                                    <Button variant="outline" size="lg" className="cursor-pointer w-full sm:w-auto">
                                        Editar perfil
                                    </Button>
                                </Link>
                                <Button variant="outline" size="lg" className="cursor-pointer w-full sm:w-auto" onClick={() => toast.info('seccion en construccion')}>
                                    Ver archivo
                                </Button>
                            </div>
                        ) : (
                            <button
                                className={`cursor-pointer w-full sm:w-auto px-4 py-2 rounded-lg ${isFollowing ? 'bg-red-500' : 'bg-sky-600'} text-white`}
                                onClick={isFollowing ? handleDeleteFollow : handleFollow}
                            >
                                {isFollowing ? "Dejar de seguir" : "Seguir"}
                            </button>

                        )}
                    </div>

                    <section className="mt-4">
                        <ul className="flex flex-wrap gap-4 justify-center md:justify-start text-gray-700 dark:text-gray-300">
                            <li>Publicaciones ({user.postCount})</li>
                            <li>Seguidores ({user.followersCount})</li>
                            <li>Seguidos ({user.followingCount}) </li>
                        </ul>
                    </section>
                </div>
            </div>

            <section className="w-full mx-auto py-10 px-6">
                <h2 className="text-3xl text-black dark:text-white text-center mb-8">Publicaciones</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-4">
                    {posts.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
                            No hay publicaciones
                        </div>
                    ) : (
                        posts.map((post: Post) => <PostCard key={post.id} post={post} />)
                    )}
                </div>

            </section>


        </div>
    )
}