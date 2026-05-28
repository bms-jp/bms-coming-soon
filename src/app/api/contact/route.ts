import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { name, email, message } = body as Record<string, unknown>

  if (typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'お名前は必須です' }, { status: 422 })
  }
  if (typeof email !== 'string' || !email.trim()) {
    return NextResponse.json({ error: 'メールアドレスは必須です' }, { status: 422 })
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: '有効なメールアドレスを入力してください' }, { status: 422 })
  }
  if (typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'お問い合わせ内容は必須です' }, { status: 422 })
  }

  const admin = createAdminClient()
  const { error } = await admin.from('contacts').insert({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  })

  if (error) {
    console.error('contacts insert error:', error)
    return NextResponse.json({ error: '送信に失敗しました。時間を置いて再度お試しください' }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
