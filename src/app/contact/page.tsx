'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const isDisabled = status === 'submitting'

  async function handleSubmit() {
    setErrorMsg(null)

    if (!name.trim()) { setErrorMsg('お名前を入力してください'); return }
    if (!email.trim()) { setErrorMsg('メールアドレスを入力してください'); return }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) { setErrorMsg('有効なメールアドレスを入力してください'); return }
    if (!message.trim()) { setErrorMsg('お問い合わせ内容を入力してください'); return }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? '送信に失敗しました。時間を置いて再度お試しください')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('通信エラーが発生しました。時間を置いて再度お試しください')
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-[480px]">

        <a
          href="/"
          className="inline-block mb-10 text-[13px] transition-colors duration-150 hover:text-[#444]"
          style={{ color: '#bbb' }}
        >
          ← トップに戻る
        </a>

        <h1
          className="mb-8 font-bold animate-fade-in-up"
          style={{ fontSize: '28px', letterSpacing: '-0.5px', color: '#0a0a0a', animationDelay: '0.05s' }}
        >
          お問い合わせ
        </h1>

        {status === 'success' ? (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            <div
              className="rounded-xl px-5 py-6 text-center"
              style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
            >
              <p className="font-semibold mb-1" style={{ color: '#15803d', fontSize: '15px' }}>
                送信しました
              </p>
              <p className="text-[13px]" style={{ color: '#4ade80' }}>
                お問い合わせありがとうございます。
              </p>
            </div>
            <div className="mt-8 text-center">
              <a
                href="/"
                className="text-[13px] transition-colors duration-150 hover:text-[#444]"
                style={{ color: '#bbb' }}
              >
                ← トップに戻る
              </a>
            </div>
          </div>
        ) : (
          <div className="animate-scale-in space-y-3" style={{ animationDelay: '0.1s' }}>
            {errorMsg && (
              <p
                role="alert"
                className="rounded-lg px-4 py-3 text-[13px]"
                style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}
              >
                {errorMsg}
              </p>
            )}

            <input
              type="text"
              placeholder="お名前 *"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={isDisabled}
              aria-label="お名前"
              className="w-full rounded-xl px-4 py-[13px] text-[14px] outline-none transition-colors duration-150 disabled:opacity-50"
              style={{ background: '#fafafa', border: '1px solid #e5e5e5', color: '#0a0a0a' }}
              onFocus={e => { (e.currentTarget as HTMLInputElement).style.border = '1px solid #aaa'; (e.currentTarget as HTMLInputElement).style.background = '#fff' }}
              onBlur={e => { (e.currentTarget as HTMLInputElement).style.border = '1px solid #e5e5e5'; (e.currentTarget as HTMLInputElement).style.background = '#fafafa' }}
            />

            <input
              type="email"
              placeholder="メールアドレス *"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isDisabled}
              aria-label="メールアドレス"
              className="w-full rounded-xl px-4 py-[13px] text-[14px] outline-none transition-colors duration-150 disabled:opacity-50"
              style={{ background: '#fafafa', border: '1px solid #e5e5e5', color: '#0a0a0a' }}
              onFocus={e => { (e.currentTarget as HTMLInputElement).style.border = '1px solid #aaa'; (e.currentTarget as HTMLInputElement).style.background = '#fff' }}
              onBlur={e => { (e.currentTarget as HTMLInputElement).style.border = '1px solid #e5e5e5'; (e.currentTarget as HTMLInputElement).style.background = '#fafafa' }}
            />

            <textarea
              placeholder="お問い合わせ内容 *"
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={isDisabled}
              aria-label="お問い合わせ内容"
              rows={5}
              className="w-full rounded-xl px-4 py-[13px] text-[14px] outline-none transition-colors duration-150 disabled:opacity-50 resize-none"
              style={{ background: '#fafafa', border: '1px solid #e5e5e5', color: '#0a0a0a' }}
              onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.border = '1px solid #aaa'; (e.currentTarget as HTMLTextAreaElement).style.background = '#fff' }}
              onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.border = '1px solid #e5e5e5'; (e.currentTarget as HTMLTextAreaElement).style.background = '#fafafa' }}
            />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isDisabled}
              aria-label="送信する"
              className="w-full rounded-xl py-[14px] text-[14px] font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: '#111', color: '#fff', border: '1px solid #111' }}
              onMouseEnter={e => { if (!isDisabled) { (e.currentTarget as HTMLButtonElement).style.background = '#333'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.005)' } }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#111'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
            >
              {isDisabled ? '送信中...' : '送信'}
            </button>
          </div>
        )}

        <div className="mt-14 text-center text-[12px]" style={{ color: '#ddd' }}>
          © BMS
        </div>
      </div>
    </div>
  )
}
