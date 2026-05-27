import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  // Supabase Auth server failed before reaching our callback
  if (error || !code) {
    console.error('[auth/callback] supabase error before callback:', error)
    return NextResponse.redirect(`${origin}/?error=auth_failed&detail=supabase_error`)
  }

  // Step 1: Exchange code for session (uses anon key + cookie)
  const supabase = await createClient()
  const { data, error: authError } = await supabase.auth.exchangeCodeForSession(code)

  if (authError || !data.user) {
    console.error('[auth/callback] exchangeCodeForSession failed:', authError)
    return NextResponse.redirect(`${origin}/?error=auth_failed&detail=exchange_failed`)
  }

  const user = data.user
  console.error('[auth/callback] user authenticated:', user.id, user.email)

  // Step 2: Upsert profile using service_role key (bypasses RLS)
  // Conflict on email: Google auth user may already exist as provider=email
  const admin = createAdminClient()
  const { error: upsertError } = await admin.from('profiles').upsert(
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
    { onConflict: 'email' }
  )

  if (upsertError) {
    console.error('[auth/callback] profiles upsert failed:', upsertError)
    return NextResponse.redirect(`${origin}/?error=auth_failed&detail=profile_upsert_failed`)
  }

  console.error('[auth/callback] profile upserted successfully')
  return NextResponse.redirect(`${origin}/thank-you`)
}
