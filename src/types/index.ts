
export type User = {
    id: number
    name: string
    username: string
    email: string
    image: string
    lastname: string
    postCount: number

}
export type Post = {
    id: number
    title: string
    description: string
    file: string
    file_type: string
    user_id: User['id']
    comments: Comment[]
    commentsCount: number
}
export type Comment={
    id: number
    username:User['username']
    user_id: User['id']
    post_id: Post['id']
    comment:string
    created: Date
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

export type ErrorsPost = {
    title?: string[];
    description?: string[];
    file?: string[];
    file_type?: string[];
    general?: string[];
  };
  