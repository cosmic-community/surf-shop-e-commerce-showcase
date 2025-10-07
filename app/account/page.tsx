'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { Package, User, LogOut, Loader2 } from 'lucide-react'

export default function AccountPage() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/account')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Account</h1>
            <p className="text-gray-600">
              Welcome back, {user.first_name || user.email}!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/account/orders" className="group">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow">
              <Package className="w-12 h-12 text-primary-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                My Orders
              </h2>
              <p className="text-gray-600">
                View and track your order history
              </p>
            </div>
          </Link>

          <Link href="/account/profile" className="group">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow">
              <User className="w-12 h-12 text-primary-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                Profile Settings
              </h2>
              <p className="text-gray-600">
                Manage your account information
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}