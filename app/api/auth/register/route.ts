import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, createUser } from '@/lib/cosmic'
import { createToken, setAuthCookie } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email.toLowerCase())

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10')
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = await createUser(
      email.toLowerCase(),
      passwordHash,
      firstName,
      lastName
    )

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
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}