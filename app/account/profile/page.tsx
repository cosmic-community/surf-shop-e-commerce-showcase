'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { Loader2, Save } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    shipping_address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/account/profile')
      return
    }

    if (user) {
      fetchProfile()
    }
  }, [user, authLoading, router])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setFormData({
          first_name: data.user.first_name || '',
          last_name: data.user.last_name || '',
          phone: data.user.phone || '',
          shipping_address: {
            street: data.user.shipping_address?.street || '',
            city: data.user.shipping_address?.city || '',
            state: data.user.shipping_address?.state || '',
            zip: data.user.shipping_address?.zip || '',
            country: data.user.shipping_address?.country || ''
          }
        })
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)

    try {
      await updateProfile(formData)
      setSuccess(true)
      // Refresh profile data after successful update
      await fetchProfile()
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
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
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/account" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Back to Account
          </Link>
          <h1 className="text-4xl font-bold">Profile Settings</h1>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            Profile updated successfully!
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              />
              <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-6 pt-6 border-t">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            
            <div className="mb-4">
              <label htmlFor="street" className="block text-sm font-semibold mb-2">
                Street Address
              </label>
              <input
                type="text"
                id="street"
                value={formData.shipping_address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shipping_address: { ...formData.shipping_address, street: e.target.value }
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="city" className="block text-sm font-semibold mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.shipping_address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shipping_address: { ...formData.shipping_address, city: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-semibold mb-2">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  value={formData.shipping_address.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shipping_address: { ...formData.shipping_address, state: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="zip" className="block text-sm font-semibold mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  value={formData.shipping_address.zip}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shipping_address: { ...formData.shipping_address, zip: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-semibold mb-2">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  value={formData.shipping_address.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shipping_address: { ...formData.shipping_address, country: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}