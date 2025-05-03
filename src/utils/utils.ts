

export const isCurrentUser = (id:number): boolean => {
    const currentUserId = JSON.parse(localStorage.getItem("user")!).id;
    return currentUserId ? parseInt(currentUserId, 10) === id : false;
};