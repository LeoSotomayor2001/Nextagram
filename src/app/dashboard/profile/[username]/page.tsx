
import Profile from '@/components/dashboard/Profile'
import React from 'react'


export const metadata = {
  title: "Nextagram - Perfil",
  description: "Perfil de Nextagram",
};
export default function ProfilePage() {
  return (
    <div className='container mt-5'>
        <h1 className='text-4xl text-center'>Perfil</h1>
        <Profile />
    </div>
  )
}
