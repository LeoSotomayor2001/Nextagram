"use client"
import { useEffect } from "react";

import { usePostStore } from "@/stores/usePostStore";
import { useParams } from "next/navigation";


export default function PostPage() {
  const params = useParams();
  const { id } = params; // Captura el ID de la URL
  const { fetchPost, } = usePostStore();

  useEffect(() => {
    if (id) {
      fetchPost(id as string);
    }
  }, [id]);

  return (
    <div>
      <p>Cargando...</p>
      
    </div>
  );
}
