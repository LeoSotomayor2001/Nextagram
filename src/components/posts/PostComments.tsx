import React from 'react'
import { Comment } from '@/types'

type PostCommentsProps = {
    styles?: string
    comments: Comment[]
}

export default function PostComments({
    styles = 'max-h-[35vh] overflow-y-auto bg-gray-100 dark:bg-gray-900 px-6 py-5',
    comments,
}: PostCommentsProps) {
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
            <form className="mt-6" aria-label="Añadir comentario">
                <textarea
                    placeholder="Escribe un comentario..."
                    className="w-full h-24 p-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    aria-label="Contenido del comentario"
                />
                <button
                    type="submit"
                    className="mt-3 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Comentar
                </button>
            </form>
        </section>
    )
}
