
import React, { useEffect } from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { DialogTitle } from "../ui/dialog";
import { FaRegHeart } from 'react-icons/fa'
import { useUserStore } from '@/stores/useUserStore';
import Link from 'next/link';
import UserPortrait from './UserProtrait';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

export default function NotificationDrawer() {
    const { fetchNotifications, notifications } = useUserStore();
    useEffect(() => {

        fetchNotifications()
    }, [fetchNotifications]);

    const handleMarkAsAllRead= async() => {
        const token=localStorage.getItem('token')
        try{
            const response=await axiosInstance.post('/notifications/mark-all-as-read',{},{
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              });
              toast.success(response.data.message);
              fetchNotifications()
            
        }
        catch(error){
            console.error('Error marking all notifications as read:', error);
        }
    }
        

    return (
        <Drawer >
            <DrawerTrigger asChild>
                <button  className="cursor-pointer flex items-center gap-2 w-full p-3 text-gray-600 dark:text-gray-400 text-base md:text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-sky-500 rounded-md transition-colors">
                    <FaRegHeart className="size-6" />
                    Notificaciones ({notifications?.length ?? 0})
                </button>
            </DrawerTrigger>
            <DrawerContent className="w-full md:w-72 h-screen bg-white dark:bg-gray-900 p-6   top-0 shadow-lg">
                <DialogTitle className="text-xl text-center font-semibold text-gray-900 dark:text-white mb-4">
                    Notificaciones
                </DialogTitle>
                <section className='overflow-y-auto'>
                    {notifications && notifications.length > 0 ? (
                        <ul className="mt-4 space-y-2">
                            {notifications.map((notification) => (
                                <li key={notification.id} className="p-1 ">
                                    <Link
                                        href={notification.data.url}
                                        className="mb-2 flex gap-2 items-center hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-md transition-colors"
                                    >
                                        <UserPortrait styles="w-6 h-6 md:w-8 md:h-8 rounded-full" image={notification.data.image} />
                                        <p>{notification.data.title}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4 text-gray-500 dark:text-gray-400">No se encontraron notificaciones.</p>
                    )}
                </section>
                    {notifications?.length >0 && (
                        <button className='mt-5 cursor-pointer ' onClick={handleMarkAsAllRead}>Marcar todas como leidas</button>

                    )}
            </DrawerContent>

        </Drawer>
    )
}
