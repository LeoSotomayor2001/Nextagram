'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Spinner from '../spinner/Spinner'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (!token || !user) {
      router.push('/auth/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">
      {/* Loading spinner o skeleton */}
      <Spinner />
    </div>
  }

  if (!isAuthenticated) {
    return null // No renderizar nada mientras redirige
  }

  return <>{children}</>
}