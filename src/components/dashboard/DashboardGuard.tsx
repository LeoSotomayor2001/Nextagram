'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Spinner from '../spinner/Spinner'

export default function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      router.push('/dashboard')
    } else {
      setIsAuthenticated(false)
    }
  }, [router])

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  if (isAuthenticated) {
    return null // No renderiza nada mientras redirige
  }

  return <>{children}</>
}