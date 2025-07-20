import { NextRequest, NextResponse } from 'next/server'
import { validateUserId } from '@/app/services/api'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const result = await validateUserId(userId)

    return NextResponse.json({
      allowed: result.allowed,
      success: result.success,
      error: result.error
    })
  } catch (error) {
    console.error('Validation route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 