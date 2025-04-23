import axios from "axios";
import { toast } from "react-toastify";

const handleAxiosError = <T extends Record<string, string[]>>(
  error: unknown,
  setErrors: React.Dispatch<React.SetStateAction<T>>
) => {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      toast.error("La solicitud tardó demasiado y fue cancelada. Intenta de nuevo.");
      return;
    }

    const responseErrors = error.response?.data?.errors;
    const generalError = error.response?.data?.error;

    if (generalError) toast.error(generalError);

    if (responseErrors) {
      setErrors(responseErrors as T);
      setTimeout(() => setErrors({} as T), 3000);
    }
  } else {
    toast.error("Ocurrió un error inesperado.");
  }
};

export default handleAxiosError;