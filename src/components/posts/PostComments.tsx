import React, { useState } from 'react'
import { Comment, ErrorsComment, Post } from '@/types'
import axiosInstance from '@/utils/axiosInstance'
import { toast } from 'react-toastify'
import { usePostStore } from '@/stores/usePostStore'
import { playSound } from '@/utils/playsound'
import handleAxiosError from '@/utils/axiosError'
import ActionsCommentsButtons from './ActionsCommentsButtons'
import UserPortrait from '../dashboard/UserProtrait'
import Link from 'next/link'

type PostCommentsProps = {
    styles?: string
    comments: Comment[]
    postId: Post['id']
}

export default function PostComments({
    styles = 'max-h-[35vh] overflow-y-auto bg-gray-100 dark:bg-gray-900 px-6 py-5',
    comments,
    postId
}: PostCommentsProps) {
    const [comment, setComment] = useState('');
    const [editingComment, setEditingComment] = useState<Comment | null>(null);
    const { fetchPost } = usePostStore()
    const [errors, setErrors] = useState<ErrorsComment>({})
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = editingComment
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${editingComment.id}`
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments`;

        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem("user")!);
        const data = editingComment
            ? { ...editingComment }
            : {
                user_id: user.id,
                post_id: postId,
                comment,
            };

        if (!comment && !editingComment?.comment) {
            toast.info('Debe escribir un comentario');
            return;
        }

        try {
            const response = await axiosInstance({
                method: editingComment ? 'put' : 'post',
                url: url,
                data: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            toast.success(response.data);
            fetchPost(postId);
            setComment('');
            setEditingComment(null); // Restablecer estado de edición
            playSound('/notification2.mp3');
        } catch (error) {
            handleAxiosError<ErrorsComment>(error, setErrors);
        }
    };

    return (
        <section className={styles} aria-labelledby="comments-heading">
            <h2
                id="comments-heading"
                className="text-lg font-semibold mb-4 text-gray-800 dark:text-white"
            >
                {comments.length > 0 ? 'Comentarios' : 'No hay comentarios'}
            </h2>


            <div className="max-h-[800px] overflow-y-auto px-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
                <ul className="space-y-4" role="list">
                    {comments.map((comment) => (
                        <section key={comment.id}>
                            <header>
                                <Link
                                    href={`/dashboard/profile/${comment.username}`}
                                    className="mb-2 flex gap-2 items-center"
                                >
                                    <UserPortrait styles="w-6 h-6 md:w-8 md:h-8 rounded-full shadow-lg" image={comment.image} />
                                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{comment.username}</p>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-100">{comment.created}</p>
                                </Link>
                            </header>
                            <li className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
                                <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
                                {comment.user_id === JSON.parse(localStorage.getItem("user")!).id && (
                                    <footer>
                                        <ActionsCommentsButtons comment={comment} setEditingComment={setEditingComment} />
                                    </footer>
                                )}
                            </li>
                        </section>
                    ))}
                </ul>
            </div>



            <form className="mt-6" aria-label="Añadir comentario" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Escribe un comentario..."
                    className="w-full h-24 p-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    aria-label="Contenido del comentario"
                    value={editingComment ? editingComment.comment : comment}
                    onChange={(e) => {
                        if (editingComment) {
                            setEditingComment({ ...editingComment, comment: e.target.value });
                        } else {
                            setComment(e.target.value);
                        }
                    }}
                />
                {errors?.comment && (
                    <p className="text-sm text-red-500 ml-2">{errors.comment}</p>
                )}
                <button
                    type="submit"
                    className="cursor-pointer mt-3 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    {editingComment ? 'Guardar cambios' : 'Comentar'}
                </button>
            </form>
        </section>
    )
}
