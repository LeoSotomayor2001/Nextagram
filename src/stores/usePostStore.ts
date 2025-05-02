import { create } from "zustand";
import axiosInstance from "@/utils/axiosInstance";
import { Post } from "@/types";
import axios from "axios";

interface PostModalState {
  isOpen: boolean;
  loading: boolean;
  post: Post | null;
  error: string | null;
  openModal: () => void;
  closeModal: () => void;
  fetchPost: (postId: number) => Promise<void>;
}

export const usePostStore = create<PostModalState>((set) => ({
  isOpen: false,
  loading: true,
  post: null,
  error: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, post: null }),


  fetchPost: async (postId) => {
    
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.get(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ post: response.data });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error });

      }
    }
    finally {
      set({ loading: false })
    }
  },
}));
