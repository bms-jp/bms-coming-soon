import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(`${origin}/?error=auth_failed`)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/?error=auth_failed`)
  }

  const user = data.user
  const { error: upsertError } = await supabase.from('profiles').upsert(
    {
      id: user.id,
      email: user.email,
      name:
        (user.user_metadata.full_name as string | undefined) ??
        (user.user_metadata.name as string | undefined) ??
        user.email ??
        '',
      provider: 'google',
      status: 'pending',
    },
    { onConflict: 'id' }
  )

  if (upsertError) {
    return NextResponse.redirect(`${origin}/?error=auth_failed`)
  }

  return NextResponse.redirect(`${origin}/thank-you`)
}
