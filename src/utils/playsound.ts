export const playSound = (direccion: string) => {
    const audio = new Audio(direccion); 
    audio.play();
  };