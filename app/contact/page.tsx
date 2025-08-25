export const metadata = { title: 'Contact — Serene Bathworks' };
export default function ContactPage() {
  const hasFormspree = !!process.env.FORMSPREE_ENDPOINT;
  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-semibold mb-6">Contact</h1>
        <p className="text-neutraldark/80 mb-6">
          Questions or custom orders? Reach out—happy to help.
        </p>
        {hasFormspree ? (
          <form
            action={process.env.FORMSPREE_ENDPOINT}
            method="POST"
            className="max-w-lg space-y-3"
          >
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full border rounded-xl px-3 py-2"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="w-full border rounded-xl px-3 py-2"
            />
            <textarea
              name="message"
              required
              placeholder="How can we help?"
              rows={5}
              className="w-full border rounded-xl px-3 py-2"
            />
            <button className="btn-primary">Send</button>
          </form>
        ) : (
          <div className="text-neutraldark/70">
            Form endpoint not configured. Add a <code>FORMSPREE_ENDPOINT</code> in your environment
            to enable the contact form.
          </div>
        )}
      </div>
    </section>
  );
}
