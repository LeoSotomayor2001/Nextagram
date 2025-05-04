import { useUserStore } from "@/stores/useUserStore";
import { User } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export default function FollowButton({user, inProfile}: {user:User,inProfile:boolean}) {
    const {fetchProfile,fetchSuggesteds}=useUserStore();
    const handleFollow = async () => {
        if (user.isMe) {
            toast.info('No puedes seguirte a ti mismo');
            return;
        }
    
        const token = localStorage.getItem('token');
        try {
            const response = await axiosInstance.post(`${user.username}/follow`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            toast.success(response.data.message);
            if(inProfile){
                fetchProfile(user.username); 

            }
            else{
                fetchSuggesteds()
            }
        } catch (error) {
            console.error(`Error al ${user.isFollowing ? 'dejar de seguir' : 'seguir'} al usuario:`, error);
            toast.error(`Error al ${user.isFollowing ? 'dejar de seguir' : 'seguir'} al usuario`);
        }
    };

    const handleDeleteFollow = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axiosInstance.delete(`${user.username}/follow`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            toast.success(response.data.message);
            if(inProfile){
                fetchProfile(user.username); 
            }
            else{
                fetchSuggesteds()
            }
        } catch (error) {
            console.error('Error al dejar de seguir al usuario:', error);
            toast.error('Error al dejar de seguir al usuario');
        }
    };
    return (
        <button
            className={`cursor-pointer w-full sm:w-auto px-4 py-2 rounded-lg ${user.isFollowing ? 'bg-red-500' : 'bg-sky-600'} text-white`}
            onClick={user.isFollowing  ? handleDeleteFollow : handleFollow}
        >
            {user.isFollowing  ? "Dejar de seguir" : "Seguir"}
        </button>
    )
}
