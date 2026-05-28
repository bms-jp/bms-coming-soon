import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-20">
      <div className="w-full max-w-[680px] mx-auto">

        <a
          href="/"
          className="inline-block mb-10 text-[13px] transition-colors duration-150 hover:text-[#444]"
          style={{ color: '#bbb' }}
        >
          ← トップに戻る
        </a>

        <h1
          className="mb-10 font-bold"
          style={{ fontSize: '28px', letterSpacing: '-0.5px', color: '#0a0a0a' }}
        >
          プライバシーポリシー
        </h1>

        <div className="space-y-8 text-[15px] leading-[1.8]" style={{ color: '#333' }}>

          <p>
            株式会社BMS（以下「当社」といいます）は、当社が提供するサービスおよび本ウェブサイト（以下「本サービス」といいます）における、利用者の個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
          </p>

          <section>
            <h2 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#0a0a0a' }}>
              第1条（取得する情報）
            </h2>
            <p>当社は、本サービスの提供にあたり、以下の情報を取得します。</p>
            <ul className="mt-2 space-y-1 pl-4" style={{ color: '#555' }}>
              <li>・氏名</li>
              <li>・メールアドレス</li>
              <li>・会社名</li>
              <li>・本サービスの利用に関連して利用者が入力・送信した情報（お問い合わせ内容を含みます）</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#0a0a0a' }}>
              第2条（利用目的）
            </h2>
            <p>当社は、取得した情報を以下の目的で利用します。</p>
            <ul className="mt-2 space-y-1 pl-4" style={{ color: '#555' }}>
              <li>・本サービスの提供、開始の案内および先行アクセスに関するご連絡のため</li>
              <li>・本サービスに関する重要なお知らせの通知のため</li>
              <li>・お問い合わせへの対応のため</li>
              <li>・本サービスの改善および新サービスの検討のため</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#0a0a0a' }}>
              第3条（第三者提供）
            </h2>
            <p>
              当社は、法令に基づく場合を除き、あらかじめ利用者の同意を得ることなく、取得した個人情報を第三者に提供しません。
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#0a0a0a' }}>
              第4条（情報の取扱いの委託）
            </h2>
            <p>
              当社は、利用目的の達成に必要な範囲において、個人情報の取扱いの全部または一部を外部に委託する場合があります。本サービスでは、データの保管に Supabase（運営：Supabase, Inc.）を、ログイン認証に Google のサービスを利用しており、これらのサービスを通じて取得した情報が国外のサーバーに保管されることがあります。当社は、委託先が個人情報を適切に取り扱うよう、必要かつ適切な監督を行います。
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#0a0a0a' }}>
              第5条（安全管理措置）
            </h2>
            <p>
              当社は、取得した個人情報の漏えい、滅失またはき損の防止その他の安全管理のために、必要かつ適切な措置を講じます。
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#0a0a0a' }}>
              第6条（開示・訂正・削除等の請求）
            </h2>
            <p>
              利用者は、当社が保有する自己の個人情報について、開示、訂正、利用停止または削除を請求することができます。これらの請求は、第8条のお問い合わせ窓口よりお申し出ください。当社は、本人からの請求であることを確認のうえ、法令に従い対応します。
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#0a0a0a' }}>
              第7条（本ポリシーの変更）
            </h2>
            <p>
              当社は、必要に応じて本ポリシーを変更することがあります。変更後の本ポリシーは、本ウェブサイトに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#0a0a0a' }}>
              第8条（お問い合わせ窓口）
            </h2>
            <p>
              本ポリシーに関するお問い合わせ、および前条の各種請求については、<Link href="/contact" style={{ color: '#2563eb', textDecoration: 'underline' }}>お問い合わせフォーム</Link>よりご連絡ください。
            </p>
          </section>

          <div
            className="pt-6 mt-6 text-[14px]"
            style={{ borderTop: '1px solid #e5e5e5', color: '#888' }}
          >
            <p>制定日：2026年5月29日</p>
            <p>株式会社BMS</p>
          </div>
        </div>

        <div className="mt-14 text-center text-[12px]" style={{ color: '#ddd' }}>
          © BMS
        </div>
      </div>
    </div>
  )
}
