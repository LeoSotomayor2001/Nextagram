"use client"

import { usePostStore } from '@/stores/usePostStore'
import axiosInstance from '@/utils/axiosInstance'
import { playSound } from '@/utils/playsound'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Comment } from "@/types"
import axios from "axios"
import { ConfirmDialog } from "./ConfirmDialog"

type ActionsCommentsButtonsType = {
  comment: Comment
  setEditingComment: React.Dispatch<React.SetStateAction<Comment | null>>
}

export default function ActionsCommentsButtons({ comment, setEditingComment }: ActionsCommentsButtonsType) {
  const { fetchPost } = usePostStore()
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteComment = async () => {
    setIsDeleting(true)
    try {
      const token = localStorage.getItem('token')
      const response = await axiosInstance.delete(`/comments/${comment.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success(response.data)
      fetchPost(comment.post_id)
      playSound('/notification4.mp3')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message=error.response?.data.error || error.response?.data.message
        if(message){
          toast.info(message)
        }
        else if (error.status = 404) {
          toast.error('Comentario no encontrado')
          return
        }
        else{
          toast.error('Oops, ha ocurrido un error');
        }
        
      }
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  return (
    <>
      <div className='flex gap-2 justify-end'>
        <button 
          onClick={() => setShowConfirm(true)}
          className='text-red-600 dark:text-red-400 cursor-pointer'
        >
          Eliminar
        </button>
        <button 
          onClick={() => setEditingComment(comment)}
          className='text-blue-500 dark:text-blue-300 cursor-pointer'
        >
          Editar
        </button>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="¿Eliminar comentario?"
        description="Esta acción no se puede deshacer. El comentario se eliminará permanentemente."
        confirmText="Eliminar"
        onConfirm={deleteComment}
        isProcessing={isDeleting}
        confirmVariant="destructive"
      />
    </>
  )
}