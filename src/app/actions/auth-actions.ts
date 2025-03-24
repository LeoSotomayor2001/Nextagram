"use server";

import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";


export async function register(formData: FormData) {
    const email = formData.get("email");
    const name = formData.get("name");
    const lastname = formData.get("lastname");
    const username = formData.get("username");
    const password = formData.get("password");
    const password_confirmation = formData.get("password_confirmation");

    // Validación básica en el frontend
    if (!email || !name || !lastname || !username || !password || !password_confirmation) {
        return { errors: { general: ["Todos los campos son obligatorios."] } };
    }

    // Crea el objeto con los datos del formulario
    const data = {
        email,
        name,
        username,
        password,
        password_confirmation,
        lastname
    };
    try {

        const response = await axiosInstance.post("/auth/register", data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return { errors: error.response.data.errors };
        }
    }
}

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
        const response = await axiosInstance.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.data.errors) {
            return { errors: error.response.data.errors };
        }
        else if(error instanceof AxiosError && error.response?.data.error){
            return { errors: { general: [error.response.data.error] } };
        }

    }
}
