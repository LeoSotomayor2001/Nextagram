/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string; // Declara aquí tus variables de entorno
    // Puedes agregar más variables si las necesitas
    readonly VITE_ANOTHER_VARIABLE?: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }