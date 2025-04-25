"use client"; 

import { updateUser } from "@/actions/user-actions";
import { ErrorsUser, User } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [errors, setErrors] = useState<ErrorsUser>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      const formData = new FormData(event.currentTarget);
      const { message, user: updatedUser, errors } = await updateUser(formData, token as string);
      
      if (errors) {
        setErrors(errors);
        setTimeout(() => {
            setErrors({});
        }, 3000);
        setIsLoading(false);
        return;
      }
      
      if (message && updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success(message)
        router.push(`/dashboard/profile/${updatedUser.username}`);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col p-4">
      <form
        className="p-6 rounded-lg shadow-md w-full md:w-96 flex flex-col border border-gray-200 dark:border-gray-700
                 bg-white dark:bg-gray-900 transition-colors duration-300"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
          defaultValue={user?.name}
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

        <input
          type="text"
          name="lastname"
          placeholder="Apellido"
          className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
          defaultValue={user?.lastname}
        />
        {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname}</span>}

        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
          defaultValue={user?.username}
        />
        {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
          defaultValue={user?.email}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full mb-4 p-3 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg
                  focus:border-sky-500 dark:focus:border-sky-400
                  focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800
                  bg-white dark:bg-gray-800
                  hover:bg-gray-50 dark:hover:bg-gray-700
                  cursor-pointer
                  transition-all duration-200 ease-in-out
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-sky-50 dark:file:bg-sky-900
                  file:text-sky-700 dark:file:text-sky-300
                  hover:file:bg-sky-100 dark:hover:file:bg-sky-800"
        />
        {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}

        <input type="hidden" name="id" defaultValue={user?.id} />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-sky-500 text-white font-medium py-2 rounded-md hover:bg-sky-600 transition-colors cursor-pointer w-full disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : 'Guardar Cambios'}
        </button>

        {errors.general && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {errors.general}
          </div>
        )}
      </form>
    </div>
  );
}