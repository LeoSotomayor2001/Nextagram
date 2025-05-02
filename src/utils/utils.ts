import { User } from "@/types";

export const isCurrentUser = (user: User): boolean => {
    const currentUserId = JSON.parse(localStorage.getItem("user")!).id;
    return currentUserId ? parseInt(currentUserId, 10) === user.id : false;
};