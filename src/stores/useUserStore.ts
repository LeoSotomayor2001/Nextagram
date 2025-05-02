import { create } from "zustand";
import axiosInstance from "@/utils/axiosInstance";
import { Post, User } from "@/types";
import axios from "axios";
import { isCurrentUser } from "@/utils/utils";

interface UserState {
  user: User;
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchProfile: (username: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: {} as User,
  posts: [],
  loading: false,
  error: null,

  fetchProfile: async (username) => {
    set({
      loading: true,
      user: {} as User, // Limpia los datos del usuario previo
      posts: [],  // Limpia los posts previos
      error: null,
    });
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(`/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userWithIsMe = {
        ...response.data,
        isMe: isCurrentUser(response.data),
      };

      set({
        user: userWithIsMe,
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
