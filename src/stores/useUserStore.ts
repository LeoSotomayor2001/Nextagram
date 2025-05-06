import { create } from "zustand";
import axiosInstance from "@/utils/axiosInstance";
import {  NotificationItem, Post, User } from "@/types";
import axios from "axios";
import { isCurrentUser } from "@/utils/utils";

interface UserState {
  user: User;
  posts: Post[];
  dashboardPosts: Post[];
  loading: boolean;
  error: string | null;
  suggesteds: User[]
  isFollowing: boolean;
  notifications: NotificationItem[];
  fetchProfile: (username: string) => Promise<void>;
  fetchPosts: () => Promise<void>;
  fetchSuggesteds: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: {} as User,
  posts: [],
  loading: false,
  dashboardPosts: [],
  error: null,
  isFollowing: false,
  suggesteds: [],
  notifications: [],

  fetchProfile: async (username) => {
    set({
      loading: true,
      user: {} as User, // Limpia los datos del usuario previo
      posts: [],  // Limpia los posts previos
      error: null,
      isFollowing: false,

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
        isMe: isCurrentUser(response.data.id),
      };

      set({
        user: userWithIsMe,
        posts: response.data.posts,
        error: null,
        isFollowing: userWithIsMe.isFollowing || false, // Establece el estado de seguimiento
      });
    } catch (err: unknown) {

      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || "Error al cargar el perfil" });
      }
    } finally {
      set({ loading: false });
    }
  },
  fetchPosts: async () => {
    set({
      loading: true,
      posts: [],
      error: null,
    });
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(`/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        dashboardPosts: response.data.posts,
        error: null,
      });

    }
    catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || "Error al cargar los posts" });
      }
    } finally {
      set({ loading: false });
    }
  },
  fetchSuggesteds: async () => {

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/followers/suggested`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        suggesteds: response.data.suggestedUsers
      })
    }
    catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || "Error al cargar los sugeridos" });
      }
    } finally {
      set({ loading: false });
    }
  },
  fetchNotifications: async () => {
    set({
      notifications: [],
      error: null,
    });
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get(`/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        notifications: response.data.data,
        error: null,
      });

    }
    catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        set({ error: err.response?.data?.error || "Error al cargar las notificaciones" });
      }
    } 
  },
}));
