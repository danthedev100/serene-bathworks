export const metadata = { title: 'About — Serene Bathworks' };
export default function AboutPage() {
  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <img
          src="/images/hero-placeholder.svg"
          alt="Artisanal production workspace with natural ingredients."
          className="rounded-2xl shadow-sm"
        />
        <div>
          <h1 className="text-3xl font-semibold">About Us</h1>
          <p className="mt-4 text-neutraldark/80">
            Serene Bathworks is a tiny Cape Town atelier crafting small‑batch bath bombs and
            mineral‑rich salts with clean, skin‑friendly ingredients. We blend therapeutic essential
            oils, clays, and sea minerals to turn everyday baths into calm rituals. Every batch is
            hand‑pressed, air‑dried, and quality‑checked so you get consistent fizz, fragrance, and
            feel‑good results—without harsh additives.
          </p>
          <p className="mt-3 text-neutraldark/80">
            Whether you need deep relaxation after a long week or a thoughtful gift, our simple
            formulas focus on what matters: soothing scents, gentle care, and a moment of quiet.
          </p>
        </div>
      </div>
    </section>
  );
}
