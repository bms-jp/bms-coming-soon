export default function ThankYouPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-white px-6 py-12"
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      }}
    >
      <div className="w-full max-w-[540px] text-center">
        {/* Badge */}
        <div className="mb-7 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-[#b7e4c7] bg-[#e6f7ed] px-4 py-[9px] text-[13px] text-[#0a7a3a]">
            株式会社BMS — REGISTERED
          </span>
        </div>

        {/* Heading */}
        <h1
          className="mb-[22px] text-[42px] font-bold leading-[1.05] text-black sm:text-[56px]"
          style={{ letterSpacing: '-2px' }}
        >
          登録ありがとうございます。
        </h1>

        {/* Subtext */}
        <p className="text-[16px] leading-[1.8] text-[#666] sm:text-[18px]">
          公開時にメールでご案内いたします。
          <br />
          お楽しみに。
        </p>
      </div>
    </div>
  )
}
