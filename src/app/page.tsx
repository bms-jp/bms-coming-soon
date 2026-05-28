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
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    setIsGoogleLoading(false)
  }

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!name.trim()) { setError('名前を入力してください'); return }
    if (!email.trim()) { setError('メールアドレスを入力してください'); return }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) { setError('有効なメールアドレスを入力してください'); return }

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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-[480px]">

        {/* Badge */}
        <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.05s' }}>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium tracking-widest uppercase"
            style={{
              background: '#f5f5f5',
              color: '#888',
              border: '1px solid #e8e8e8',
            }}
          >
            <span
              className="h-[5px] w-[5px] rounded-full"
              style={{ background: '#bbb' }}
            />
            業務自動化マーケットプレイス — 2026年夏 ローンチ予定
          </span>
        </div>

        {/* Heading */}
        <h1
          className="mb-6 font-bold animate-fade-in-up"
          style={{
            fontSize: 'clamp(40px, 8vw, 58px)',
            lineHeight: 1.05,
            letterSpacing: '-2px',
            color: '#0a0a0a',
            animationDelay: '0.1s',
          }}
        >
          仕事を手放す、
          <br />
          会社を伸ばす。
        </h1>

        {/* Sub messages */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.18s' }}>
          <p className="text-[16px] leading-[1.7] mb-1" style={{ color: '#444' }}>
            任せるほど、ROIが上がる。任せるほど、会社が賢くなる。
          </p>
          <p className="text-[14px]" style={{ color: '#999' }}>
            公開前の先行アクセス登録を受付中です。
          </p>
        </div>

        {/* Registration card */}
        <div
          className="animate-scale-in"
          style={{ animationDelay: '0.26s' }}
        >
          {/* Google sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isDisabled}
            aria-label="Googleアカウントで登録する"
            className="w-full rounded-xl py-[14px] text-[14px] font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
            style={{
              background: '#fff',
              border: '1px solid #e5e5e5',
              color: '#222',
            }}
            onMouseEnter={e => { if (!isDisabled) (e.currentTarget as HTMLButtonElement).style.background = '#fafafa' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff' }}
          >
            <span className="flex items-center justify-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {isGoogleLoading ? 'リダイレクト中...' : 'Googleで先行アクセス登録'}
            </span>
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3" aria-hidden="true">
            <div className="h-px flex-1" style={{ background: '#ebebeb' }} />
            <span className="text-[12px]" style={{ color: '#bbb' }}>または</span>
            <div className="h-px flex-1" style={{ background: '#ebebeb' }} />
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg px-4 py-3 text-[13px]"
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
              }}
            >
              {error}
            </p>
          )}

          {/* Email form */}
          <form onSubmit={handleEmailSubmit} noValidate className="space-y-3">
            {(['名前 *', 'メールアドレス *', '会社名（任意）'] as const).map((label, i) => {
              const types = ['text', 'email', 'text'] as const
              const values = [name, email, company]
              const setters = [setName, setEmail, setCompany]
              return (
                <input
                  key={label}
                  type={types[i]}
                  placeholder={label}
                  value={values[i]}
                  onChange={e => setters[i](e.target.value)}
                  disabled={isDisabled}
                  required={i < 2}
                  aria-required={i < 2}
                  aria-label={label}
                  className="w-full rounded-xl px-4 py-[13px] text-[14px] outline-none transition-colors duration-150 disabled:opacity-50"
                  style={{
                    background: '#fafafa',
                    border: '1px solid #e5e5e5',
                    color: '#0a0a0a',
                  }}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.border = '1px solid #aaa'; (e.currentTarget as HTMLInputElement).style.background = '#fff' }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.border = '1px solid #e5e5e5'; (e.currentTarget as HTMLInputElement).style.background = '#fafafa' }}
                />
              )
            })}
            <button
              type="submit"
              disabled={isDisabled}
              aria-label="メールアドレスで先行アクセス登録する"
              className="w-full rounded-xl py-[14px] text-[14px] font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background: '#111',
                color: '#fff',
                border: '1px solid #111',
              }}
              onMouseEnter={e => { if (!isDisabled) { (e.currentTarget as HTMLButtonElement).style.background = '#333'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.005)' } }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#111'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
            >
              {isSubmitting ? '登録中...' : '先行アクセスを取得'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p
          className="mt-12 text-center text-[12px] animate-fade-in"
          style={{ color: '#ccc', animationDelay: '0.4s' }}
        >
          © 2026 株式会社BMS
        </p>
      </div>
    </div>
  )
}
