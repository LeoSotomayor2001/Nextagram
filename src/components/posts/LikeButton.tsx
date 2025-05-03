import { usePostStore } from "@/stores/usePostStore";
import { Post } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";

const reactions = [
  { id: "like", emoji: "👍", label: "Me gusta" },
  { id: "love", emoji: "❤️", label: "Me encanta" },
  { id: "haha", emoji: "😂", label: "Me divierte" },
  { id: "sad", emoji: "😢", label: "Me entristece" },
  { id: "angry", emoji: "😡", label: "Me enoja" }
];

export default function LikeButton({ post }: { post: Post }) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const {fetchPost}=usePostStore()

  const handleReaction =async (reactionId: string) => {
    setSelectedReaction(reactions.find(r => r.id === reactionId)?.emoji || "👍");
    setShowPicker(false);
    const token = localStorage.getItem("token");
    try{
        const response= await axiosInstance.post("/posts/reaction", {
            post_id: post.id,
            type: reactionId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success(response.data.message)
        fetchPost(post.id)
    }catch(error){
        console.error( error);
        toast.error("Error al enviar la reacción. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="relative flex items-center gap-3">
      {/* Botón Principal */}
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {selectedReaction || "👍"} <span className="text-sm">Reaccionar</span>
      </button>

      {/* Mostrar emojis con conteo de reacciones */}
      <div className="flex gap-3">
        {reactions.map((reaction) => (
          <div key={reaction.id} className="flex items-center gap-1 text-sm">
            <span>{reaction.emoji}</span>
            <span>{post.reactions?.[reaction.id] || 0}</span>
          </div>
        ))}
      </div>

      {/* Picker de reacciones */}
      {showPicker && (
        <div className="absolute bottom-full mb-2 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-md flex gap-2">
          {reactions.map(reaction => (
            <button
              key={reaction.id}
              title={reaction.label}
              onClick={() => handleReaction(reaction.id)}
              className="p-2 rounded-full hover:scale-110 transition-transform text-xl"
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
