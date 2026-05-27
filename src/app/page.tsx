'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function HomePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const isDisabled = isSubmitting || isGoogleLoading

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    setIsGoogleLoading(false)
  }

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('名前を入力してください')
      return
    }
    if (!email.trim()) {
      setError('メールアドレスを入力してください')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('有効なメールアドレスを入力してください')
      return
    }

    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const { error: dbError } = await supabase.from('profiles').insert({
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || null,
        provider: 'email',
        status: 'pending',
      })

      if (dbError) {
        if (dbError.code === '23505') {
          setError('このメールアドレスはすでに登録済みです')
        } else {
          setError('登録に失敗しました。お手数ですが再度お試しください')
        }
        return
      }

      router.push('/thank-you')
    } catch {
      setError('通信エラーが発生しました。時間を置いて再度お試しください')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-white px-6 py-12"
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      }}
    >
      <div className="w-full max-w-[540px]">
        {/* Badge */}
        <div className="mb-7">
          <span className="inline-flex items-center rounded-full border border-[#e7e7e7] bg-[#fafafa] px-4 py-[9px] text-[13px] text-[#666]">
            株式会社BMS — EARLY ACCESS
          </span>
        </div>

        {/* Heading */}
        <h1
          className="mb-[22px] text-[42px] font-bold leading-[1.05] text-black sm:text-[56px]"
          style={{ letterSpacing: '-2px' }}
        >
          The future platform
          <br />
          by BMS.
        </h1>

        {/* Subtext */}
        <p className="mb-[42px] text-[16px] leading-[1.8] text-[#666] sm:text-[18px]">
          株式会社BMSの新しいサービスを開発中です。
          <br />
          公開前の先行アクセス登録を受付しています。
        </p>

        {/* Registration card */}
        <div
          className="rounded-[28px] border border-[#ededed] bg-white p-6 sm:p-8"
          style={{ boxShadow: '0 12px 50px rgba(0,0,0,0.05)' }}
        >
          {/* Google sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isDisabled}
            aria-label="Googleアカウントで登録する"
            className="w-full rounded-2xl bg-[#111] py-[17px] text-[15px] font-semibold text-white transition-opacity duration-200 hover:opacity-[0.92] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGoogleLoading ? 'リダイレクト中...' : 'Googleで登録'}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3" aria-hidden="true">
            <div className="h-px flex-1 bg-[#ececec]" />
            <span className="text-[13px] text-[#999]">または</span>
            <div className="h-px flex-1 bg-[#ececec]" />
          </div>

          {/* Error message */}
          {error && (
            <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Email form */}
          <form onSubmit={handleEmailSubmit} noValidate>
            <input
              type="text"
              placeholder="名前 *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isDisabled}
              required
              aria-required="true"
              aria-label="名前"
              className="mb-[14px] w-full rounded-2xl border border-[#e4e4e4] px-4 py-[17px] text-[15px] text-black placeholder:text-[#999] outline-none transition-colors focus:border-[#111] disabled:opacity-50"
            />
            <input
              type="email"
              placeholder="メールアドレス *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isDisabled}
              required
              aria-required="true"
              aria-label="メールアドレス"
              className="mb-[14px] w-full rounded-2xl border border-[#e4e4e4] px-4 py-[17px] text-[15px] text-black placeholder:text-[#999] outline-none transition-colors focus:border-[#111] disabled:opacity-50"
            />
            <input
              type="text"
              placeholder="会社名（任意）"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={isDisabled}
              aria-label="会社名（任意）"
              className="mb-[14px] w-full rounded-2xl border border-[#e4e4e4] px-4 py-[17px] text-[15px] text-black placeholder:text-[#999] outline-none transition-colors focus:border-[#111] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isDisabled}
              aria-label="メールアドレスで登録する"
              className="w-full rounded-2xl bg-[#f3f3f3] py-[17px] text-[15px] font-semibold text-[#111] transition-colors duration-200 hover:bg-[#eaeaea] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? '登録中...' : '登録する'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[13px] text-[#999]">© 2026 株式会社BMS</p>
      </div>
    </div>
  )
}
