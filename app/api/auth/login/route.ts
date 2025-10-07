import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/cosmic'
import { createToken, setAuthCookie } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await getUserByEmail(email.toLowerCase())

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.metadata.password_hash)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await createToken({
      userId: user.id,
      email: user.metadata.email
    })

    // Set cookie
    await setAuthCookie(token)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.metadata.email,
        first_name: user.metadata.first_name,
        last_name: user.metadata.last_name
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}