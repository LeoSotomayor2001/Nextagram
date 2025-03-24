
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata = {
    title: "Nextagram - Registro",
    description: "Copia de instagram",
};

export default function RegisterPage() {

    return (
        <div className="flex justify-center items-center h-screen flex-col p-4">

            <RegisterForm />

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

    )
}
