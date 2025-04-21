import { create } from "zustand";
import axiosInstance from "@/utils/axiosInstance";
import { Post, User } from "@/types";
import axios from "axios";

interface UserState {
  user: User;
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchUser: (username: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    user: {} as User, 
    posts: [],
    loading: false,
    error: null,

  fetchUser: async (username) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(`/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        user: response.data,
        posts: response.data.posts,
        error: null,
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || "Error al cargar el perfil" });
      }
    } finally {
      set({ loading: false });
    }
  },
}));
