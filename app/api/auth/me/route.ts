import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { cosmic } from '@/lib/cosmic'
import { User } from '@/types'

export async function GET() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Fetch full user details
    const response = await cosmic.objects
      .findOne({
        type: 'users',
        id: currentUser.userId
      })
      .props(['id', 'metadata'])
      .depth(0)

    const user = response.object as User

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.metadata.email,
        first_name: user.metadata.first_name,
        last_name: user.metadata.last_name
      }
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Authentication check failed' },
      { status: 500 }
    )
  }
}