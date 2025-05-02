import React from 'react'
import { Button } from '../ui/button'
import axiosInstance from '@/utils/axiosInstance'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const router=useRouter()
    const logout= async () =>{
        try{
            const token=localStorage.getItem('token')
            const response = await axiosInstance.post(`/logout`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            localStorage.clear()
            toast.success(response.data.message)
            router.push('/auth/login')
        }
        catch(error:unknown){
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.error || 'Error al cerrar sesión')
                if(error.response?.data.error==='Sesión expirada'){
                    localStorage.clear()
                    router.push('/auth/login')
                }
            }
        }

    }
    return (
        <Button
            variant={'destructive'}
            className="w-full cursor-pointer "
            onClick={logout}
        >

            Cerrar sesión
        </Button>
    )
}
