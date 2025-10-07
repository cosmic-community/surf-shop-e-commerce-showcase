import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { updateUser } from '@/lib/cosmic'
import { User } from '@/types'

export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const data = await request.json() as Partial<User['metadata']>

    // Remove sensitive fields that shouldn't be updated directly
    delete (data as any).password_hash
    delete (data as any).email

    // Update user
    const updatedUser = await updateUser(currentUser.userId, data)

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        email: updatedUser.metadata.email,
        first_name: updatedUser.metadata.first_name,
        last_name: updatedUser.metadata.last_name
      }
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}