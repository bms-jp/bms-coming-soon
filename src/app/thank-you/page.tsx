export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-[480px] text-center">

        {/* Badge */}
        <div className="mb-10 flex justify-center animate-fade-in" style={{ animationDelay: '0.05s' }}>
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium tracking-widest uppercase"
            style={{
              background: '#f0fdf4',
              color: '#16a34a',
              border: '1px solid #bbf7d0',
            }}
          >
            <span
              className="h-[5px] w-[5px] rounded-full"
              style={{ background: '#22c55e' }}
            />
            株式会社BMS — Registered
          </span>
        </div>

        {/* Heading */}
        <h1
          className="mb-5 font-bold animate-fade-in-up"
          style={{
            fontSize: 'clamp(32px, 7vw, 48px)',
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            color: '#0a0a0a',
            animationDelay: '0.1s',
          }}
        >
          登録ありがとうございます。
        </h1>

        {/* Subtext */}
        <p
          className="text-[15px] leading-[1.8] animate-fade-in-up"
          style={{ color: '#666', animationDelay: '0.2s' }}
        >
          公開時にメールでご案内いたします。
          <br />
          お楽しみに。
        </p>

        {/* Back link */}
        <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <a
            href="/"
            className="text-[13px] transition-colors duration-150 hover:text-[#444]"
            style={{ color: '#bbb' }}
          >
            ← トップに戻る
          </a>
        </div>

        {/* Footer */}
        <p
          className="mt-14 text-[12px] animate-fade-in"
          style={{ color: '#ddd', animationDelay: '0.4s' }}
        >
          © 2026 株式会社BMS
        </p>
      </div>
    </div>
  )
}
