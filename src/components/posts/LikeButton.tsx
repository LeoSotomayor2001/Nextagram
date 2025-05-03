import { usePostStore } from "@/stores/usePostStore";
import { Post } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "react-toastify";
import axios from "axios";

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
  const { fetchPost } = usePostStore()
  const userReactionEmoji = reactions.find(r => r.id === post.userReactionType)?.emoji || "👍";
  const buttonTextColor = post.userHasReacted ? "text-blue-500 dark:text-blue-400" : "text-gray-600 dark:text-gray-400";

  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleButtonClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      setShowPicker(!showPicker); // Doble clic → abrir el picker
    } else {
      const timeout = setTimeout(() => {
        handleDeleteReaction(); // Un solo clic → quitar reacción
        setClickTimeout(null);
      }, 300); // Tiempo para detectar si es doble clic
      setClickTimeout(timeout);
    }
  };


  const handleReaction = async (reactionId: string) => {
    setSelectedReaction(reactions.find(r => r.id === reactionId)?.emoji || "👍");
    setShowPicker(false);
    const token = localStorage.getItem("token");
    try {
      await axiosInstance.post("/posts/reaction", {
        post_id: post.id,
        type: reactionId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchPost(post.id)
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar la reacción. Inténtalo de nuevo más tarde.");
    }
  };

  const handleDeleteReaction = async () => {
    setSelectedReaction(null);
    setShowPicker(false);
    const token = localStorage.getItem("token");
    try {
      await axiosInstance.delete("/posts/reaction", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          post_id: post.id
        }
      });

      fetchPost(post.id)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.error || error.response?.data.message
        if (message) {
          toast.info(message)
        }
        else {
          toast.error('Oops, ha ocurrido un error');
        }

      }
    }
  };

  return (

    <div className="relative flex items-center gap-3">
      {/* Botón Principal con Tooltip */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleButtonClick}
            className={`flex items-center gap-2 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-lg 
              hover:bg-gray-300 dark:hover:bg-gray-700 transition ${buttonTextColor}`}
          >
            {selectedReaction || userReactionEmoji} <span className="text-sm">Reaccionar</span>
          </button>
        </TooltipTrigger>
        <TooltipContent className="text-xl text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-md shadow-md p-3 ">
          1 click para quitar la reacción, 2 para reaccionar
        </TooltipContent>
      </Tooltip>

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
        <div className="absolute bottom-full mb-2 bg-white dark:bg-gray-900 p-1 rounded-lg shadow-md flex gap-2">
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
