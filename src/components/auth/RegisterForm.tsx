"use client";

import { useState } from "react";
import { register } from "@/actions/auth-actions";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { roboto } from "@/fonts";
import Link from "next/link";

type ErrorsRegister = {
    email?: string;
    name?: string;
    lastname?: string;
    username?: string;
    password?: string;
    password_confirmation?: string;
    general?: string[];
}

export default function RegisterForm() {
    const [errors, setErrors] = useState<ErrorsRegister>({});
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const result = await register(formData);
        console.log(result)
        if (result?.errors) {
            setErrors(result.errors); // Almacena los errores en el estado
            setTimeout(() => {
                setErrors({});
            }, 3000);
        } else if (result?.success) {
            router.push("/auth/login");
            toast.success("Registro exitoso. Redirigiendo...");
        } else {
            toast.error("Ocurrió un error inesperado. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen flex-col p-4">
            <form
                className="p-6 rounded-lg shadow-md w-full md:w-96 flex flex-col border border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-900 transition-colors duration-300"
                onSubmit={handleSubmit}
            >
                <h1
                    className={`${roboto.className} text-3xl md:text-4xl mb-4 font-bold text-gray-900 dark:text-white text-center`}
                >
                    Nextagram
                </h1>
                <span className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-6 text-center font-semibold">
                    Regístrate para ver fotos y vídeos de tus amigos.
                </span>
                {errors.general && (
                    <div className="bg-red-500 text-sm mb-4 text-center text-white p-3">
                        {errors.general.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                {/* Campos del formulario */}
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
                />
                {errors.name && <span className="text-red-500">{errors.name}</span>}
                <input
                    type="text"
                    name="lastname"
                    placeholder="Apellido"
                    className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
                />
                {errors.lastname && <span className="text-red-500">{errors.lastname}</span>}
                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
                />
                {errors.username && <span className="text-red-500">{errors.username}</span>}
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
                />
                {errors.password && <span className="text-red-500">{errors.password}</span>}
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Repetir contraseña"
                    className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
                />

                {/* Botón de registro */}
                <button
                    type="submit"
                    className="bg-sky-500 text-white font-medium py-2 rounded-md hover:bg-sky-600 transition-colors cursor-pointer w-full"
                >
                    Registrarse
                </button>
            </form>
            {/* Enlace para iniciar sesión */}
            <div className="p-6 rounded-lg shadow-md w-full md:w-96 flex flex-col border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 my-5 transition-colors duration-300">
                <Link
                    href="/auth/login"
                    className="text-gray-600 dark:text-gray-400 text-base md:text-lg text-center font-semibold hover:text-sky-500 dark:hover:text-sky-500 transition-colors"
                >
                    ¿Ya tienes una cuenta? <span className="text-sky-500">Inicia sesión</span>
                </Link>
            </div>
        </div>
    );
}
