This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact form security

The contact endpoint validates and limits request bodies on the server, rejects cross-origin browser
requests, verifies Cloudflare Turnstile tokens, uses a honeypot, and sends through Resend with an
idempotency key. Copy `.env.example` to `.env.local` and configure these values before using the form:

- `RESEND_API_KEY`: a Resend key with **Sending access**, restricted to the sending domain.
- `CONTACT_FROM_EMAIL`: a sender on the verified Resend domain.
- `CONTACT_TO_EMAIL`: the inbox that receives contact messages.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: the public key for a Cloudflare Turnstile widget.
- `TURNSTILE_SECRET_KEY`: the matching private Turnstile key.
- `TURNSTILE_ALLOWED_HOSTNAMES`: optional comma-separated production hostnames checked after token
  verification.
- `CONTACT_FORM_ALLOWED_ORIGINS`: optional comma-separated additional browser origins, such as a
  stable preview domain. The request's own origin is allowed automatically.

Turnstile is fail-closed: without both client and server keys, the form remains unavailable. For local
development only, Cloudflare provides the always-pass site key `1x00000000000000000000AA` and secret
key `1x0000000000000000000000000000000AA`. Do not use test keys in production.

### Vercel rate limit

In the Vercel project dashboard, open **Firewall**, create a rule matching `POST /api/send`, and apply a
fixed-window rate limit keyed by IP. A practical starting value for this portfolio is 5 requests per 10
minutes with the default `429` response. Monitor the rule before tightening it. Platform-level limiting
is intentional because an in-memory limiter is not reliable across serverless instances and would not
protect function or email-provider usage.

After changing the form, run:

```bash
npm test
npm run typecheck
npm run build
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
