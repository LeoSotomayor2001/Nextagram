import { ReactNode } from "react"

export type User = {
    id: number
    name: string
    username: string
    email: string
    image: string
    lastname: string
    postCount: number
    followersCount: number
    followingCount: number
    isMe?: boolean
    isFollowing?: boolean

}
export type Post = {
    id: number
    title: string
    description: string
    file: string
    file_type: string
    user_id: User['id']
    userImage:User['image']
    username:User['username']
    created:ReactNode
    comments: Comment[]
    commentsCount: number
    reactions?: { [key: string]: number };
    reactionsCount: number
    userHasReacted: boolean; 
    userReactionType:string | null; 
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
