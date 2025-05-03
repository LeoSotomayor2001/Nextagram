import { ReactNode } from "react"

export type User = {
    id: number
    name: string
    username: string
    email: string
    image: string
    lastname: string
    postCount: number
    isMe?: boolean

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
    reactions?: { [key: string]: number }; // Reactions count for each type
    reactionsCount: number
    userHasReacted: boolean; // Indicates if the user has reacted to the post
    userReactionType:string | null; // Indicates the type of reaction the user has given (if any)
}

export type Comment = {
    id: number
    username: User['username']
    image: User['image']
    user_id: User['id']
    post_id: Post['id']
    comment: string
    created: ReactNode
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

export type ErrorsComment={
    comment?:string[]
    user_id?: string[]
    post_id?: string[];
    general?: string[];
}
