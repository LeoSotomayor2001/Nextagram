import { roboto } from "@/fonts";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen flex-col p-4">
      {/* Formulario de inicio de sesión */}
      <form className="p-6 rounded-lg shadow-md w-full md:w-96 flex flex-col border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Título */}
        <h1 className={`${roboto.className} text-3xl md:text-4xl mb-4 font-bold text-gray-900 dark:text-white text-center`}>
          Nextagram
        </h1>

        {/* Campo de correo electrónico */}
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
        />

        {/* Campo de contraseña */}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="bg-white dark:bg-gray-800 mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors w-full"
        />

        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          className="bg-sky-500 text-white font-medium py-2 rounded-md hover:bg-sky-600 transition-colors cursor-pointer w-full"
        >
          Iniciar Sesión
        </button>
      </form>

      {/* Enlace para registrarse */}
      <div className="p-6 rounded-lg shadow-md w-full md:w-96 flex flex-col border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 my-5 transition-colors duration-300">
        <Link
          href="/auth/register"
          className="text-gray-600 dark:text-gray-400 text-base md:text-lg text-center font-semibold hover:text-sky-500 dark:hover:text-sky-500 transition-colors"
        >
          ¿No tienes una cuenta? <span className="text-sky-500">Regístrate</span>
        </Link>
      </div>
    </div>
  )
}
