# Verdana Protocol

**DAO-governed Green RWA marketplace** — environmental assets verified, approved, and standardized by the community.

---

## Summary

Verdana Protocol is a Green Real-World Assets (RWA) marketplace governed by a DAO. It is not “a marketplace with a DAO”, but a **DAO that governs the marketplace**: verification, approval, and standardization of environmental assets are managed by the community through governance.

- **Website (marketing):** landing, about, how it works, suppliers, governance, docs, contact  
- **App (separate section):** connect wallet → dashboard, marketplace, portfolio, retirement (burn), certificates, governance (proposals, voting, treasury)

The **Get started** button on the website links to the App (`/app`).

---

## Project structure

```
ecosol-dao/
├── README.md                 # This file
├── app/                      # Next.js application (frontend)
│   ├── app/                  # App Router
│   │   ├── layout.tsx        # Root layout (marketing header/footer)
│   │   ├── page.tsx          # Home (/)
│   │   ├── about/
│   │   ├── how-it-works/
│   │   ├── suppliers/
│   │   ├── supplier/[id]/
│   │   ├── docs/             # Documentation (litepaper, technical, FAQ, ESG)
│   │   ├── governance/
│   │   ├── contact/
│   │   ├── app/              # dApp (after clicking Get started)
│   │   │   ├── layout.tsx    # App layout (WalletProvider, app nav)
│   │   │   ├── page.tsx      # /app (connect / redirect to dashboard)
│   │   │   ├── dashboard/
│   │   │   ├── marketplace/
│   │   │   ├── asset/[id]/
│   │   │   ├── portfolio/
│   │   │   ├── purchase-order/
│   │   │   ├── certificate/[id]/
│   │   │   └── governance/   # overview, proposals, proposal/[id], create-proposal, vote, treasury
│   │   ├── admin/
│   │   └── burn/
│   ├── components/           # React components
│   ├── lib/                  # Utilities, mock data, Solana/Anchor
│   ├── next.config.js
│   ├── package.json
│   └── tailwind.config.ts
├── programs/                 # Anchor programs (ecosol, ecosol-dao)
└── migrations/               # Anchor migrations
```

---

## How to run

### Prerequisites

- Node.js 18+
- npm or yarn

### Steps

1. **Install dependencies**
   ```bash
   cd app
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```
   Open **http://localhost:3000** (or the port shown).

3. **Production build**
   ```bash
   npm run build
   npm start
   ```

### Key routes

| Route        | Description                    |
|-------------|--------------------------------|
| `/`         | Home (website)                 |
| `/app`      | dApp entry (connect → dashboard) |
| `/app/dashboard` | Dashboard, portfolio value, quick actions |
| `/app/marketplace` | Asset listings                |
| `/app/purchase-order` | Enterprise purchase order form |
| `/app/governance/overview` | DAO overview, proposals |
| `/docs`     | Documentation                 |
| `/governance` | Marketing governance page   |

---

## Tech stack

- **Next.js 14** (App Router)
- **React 18**, **TypeScript**
- **Tailwind CSS**, **Framer Motion**
- **Solana** (wallet-adapter, web3.js, Anchor for programs)

---

## Network

The app is configured for **Solana Devnet**. Set your wallet (Phantom, Solflare, etc.) to Devnet when using the dApp.

---

## License & contribution

MIT. Contributions welcome.

For technical questions or full documentation access, use the [Contact](/contact) page on the website.
