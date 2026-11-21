import { NextRequest, NextResponse } from 'next/server'
import { resolveSeedUrl } from '@/lib/utils'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params
  const target = resolveSeedUrl(filename)
  return NextResponse.redirect(new URL(target, req.url), 307)
}
