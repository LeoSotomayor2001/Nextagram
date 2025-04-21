'use client'
import { useParams } from 'next/navigation'
import { Button } from "../ui/button"
import axiosInstance from '@/utils/axiosInstance'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '../spinner/Spinner'
import axios from 'axios'
import { Post, User } from '@/types'
import Link from 'next/link'
import UserPortrait from './UserProtrait'
import Posts from './Posts'

export default function Profile() {
    const params = useParams<{ username: string }>()
    const username = params.username
    const [user, setUser] = useState<User | null>(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    router.push('/auth/login')
                    return
                }

                const response = await axiosInstance.get(`/users/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setUser(response.data)
                setPosts(response.data.posts)
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.error || 'Error al cargar el perfil');
                }
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [username, router])

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
                <Button onClick={() => router.push('/dashboard')}>
                    Volver al dashboard
                </Button>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {posts?.map((post: Post) => (
                        <Posts key={post.id} post={post} />
                    ))}
                </div>
            </section>


        </div>
    )
}