import { create } from "zustand";
import axiosInstance from "@/utils/axiosInstance";
import { Post } from "@/types";

interface PostModalState {
  isOpen: boolean;
  post: Post | null;
  openModal: () => void;
  closeModal: () => void;
  fetchPost: (postId: string) => Promise<void>;
}

export const usePostStore = create<PostModalState>((set) => ({
  isOpen: false,
  post: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, post: null }),
  fetchPost: async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.get(`/posts/${postId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ post: response.data });
    } catch (err) {
      console.error("Error al obtener el post:", err);
    }
  },
}));
