"use server";

import { ErrorsUser, User } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export async function updateUser(formData: FormData, token: string): Promise<{
  message?: string;
  user?: User;
  errors?: ErrorsUser
}> {
  try {
    const payload = new FormData();
    const id = formData.get('id');

    // Campos básicos que siempre se envían (si tienen valor)
    const basicFields = ['name', 'lastname', 'username', 'email'];
    basicFields.forEach(field => {
      const value = formData.get(field);
      if (value && value.toString().trim() !== '') {
        payload.append(field, value);
      }
    });

    // Manejo especial para la imagen (solo si se subió un archivo)
    const imageFile = formData.get('image');
    if (imageFile instanceof File && imageFile.size > 0) {
      payload.append('image', imageFile);
    }

    const response = await axiosInstance.post(`/users/${id}`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return {
      message: response.data?.message || "Usuario actualizado correctamente",
      user: response.data?.user
    };

  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        console.log(error.response);
        return {
          errors: error.response.data?.errors ||
            { general: error.response.data?.error || "Error al actualizar el usuario" }
        };
      }
      return {
        errors: { general: "Error de conexión con el servidor" }
      };
    }
    return {
      errors: { general: "Error inesperado" }
    };
  }
}