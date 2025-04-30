import React, { useState } from 'react'
import { Comment, ErrorsComment, Post } from '@/types'
import axiosInstance from '@/utils/axiosInstance'
import { toast } from 'react-toastify'
import { usePostStore } from '@/stores/usePostStore'
import { playSound } from '@/utils/playsound'
import handleAxiosError from '@/utils/axiosError'

type PostCommentsProps = {
    styles?: string
    comments: Comment[]
    postId:Post['id']
}

export default function PostComments({
    styles = 'max-h-[35vh] overflow-y-auto bg-gray-100 dark:bg-gray-900 px-6 py-5',
    comments,
    postId
}: PostCommentsProps) {
    const [comment,setComment]=useState('');
    const {fetchPost}= usePostStore()
    const [errors,setErrors]= useState<ErrorsComment>({})
    const handleSubmit= async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const url=`${process.env.NEXT_PUBLIC_API_BASE_URL}/comments`
        const user = JSON.parse(localStorage.getItem("user")!);
        const token=localStorage.getItem('token')
        const data={
            user_id:user.id,
            post_id:postId,
            comment
        }
        if(!comment){
            toast.info('Debe escribir un comentario')
            return
        }
        try {
            const response=await axiosInstance.post(url,data,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  }
            })
            toast.success(response.data)
            fetchPost(postId)
            setComment('')
            playSound('/notification2.mp3')
        } catch (error) {
            handleAxiosError<ErrorsComment>(error,setErrors)
        }

    }
    return (
        <section className={styles} aria-labelledby="comments-heading">
            <h2
                id="comments-heading"
                className="text-lg font-semibold mb-4 text-gray-800 dark:text-white"
            >
                {comments.length > 0 ? 'Comentarios' : 'No hay comentarios'}
            </h2>

            {/* Lista de comentarios */}
            <ul className="space-y-4" role="list">
                {comments.map((comment) => (
                    <li
                        key={comment.id}
                        className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
                    >
                        <header className="mb-2">
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                {comment.username}
                            </p>
                        </header>
                        <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
                    </li>
                ))}
            </ul>

            {/* Formulario */}
            <form className="mt-6" aria-label="Añadir comentario" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Escribe un comentario..."
                    className="w-full h-24 p-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    aria-label="Contenido del comentario"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                 {errors?.comment && (
              <p className="text-sm text-red-500 ml-2">{errors.comment}</p>
            )}
                <button
                    type="submit"
                    className="cursor-pointer mt-3 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Comentar
                </button>
            </form>
        </section>
    )
}
