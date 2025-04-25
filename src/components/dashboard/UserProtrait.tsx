"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
    image?: string | null;
    styles?: string;
    aspectRatio?: string; // Nueva prop para controlar el aspect ratio
};

export default function UserPortrait({ 
    image, 
    styles = 'w-32 h-32 md:w-46 md:h-46 rounded-full shadow-lg',
    aspectRatio = 'aspect-square' 
}: Props) {
    const [src, setSrc] = useState(
        image ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/imagen/${image}` : '/usuario.svg'
    );
  
    useEffect(() => {
        setSrc(
            image ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/imagen/${image}` : '/usuario.svg'
        );
    }, [image]);

    const handleError = () => {
        setSrc('/usuario.svg');
    };
  
    return (
        <div className={`relative ${aspectRatio} ${styles}`}>
            <Image
                src={src}
                fill
                className="object-cover rounded-full"
                alt="Foto del usuario"
                onError={handleError}
                unoptimized={process.env.NODE_ENV !== 'production'}
                sizes="(max-width: 768px) 100vw, 50vw" // Mejora para responsive
                style={{
                    objectPosition: 'center' // Asegura que la imagen esté centrada
                }}
            />
        </div>
    );
}