
export type User = {
    id: number
    name: string
    username: string
    email: string
    image: string
    lastname:string
    // Agrega otros campos necesarios
}

export type ErrorsUser = {
    email?: string;
    password?: string;
    name?: string;
    username?: string;
    general?: string
    lastname?: string
    image?: string
  }
