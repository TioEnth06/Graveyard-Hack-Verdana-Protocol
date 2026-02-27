# Verdana Protocol

**DAO-governed Green RWA marketplace** — environmental assets verified, approved, and standardized by the community.

---

## Ringkasan

Verdana Protocol adalah marketplace aset hijau (Green Real-World Assets) yang diatur oleh DAO. Bukan “marketplace plus DAO”, melainkan **DAO yang mengatur marketplace**: verifikasi, persetujuan, dan standarisasi aset lingkungan dikelola oleh komunitas melalui governance.

- **Website (utama):** landing, tentang, cara kerja, suppliers, governance, docs, kontak  
- **App (halaman terpisah):** connect wallet → dashboard, marketplace, portfolio, retirement (burn), sertifikat, governance (proposal, voting, treasury)

Tombol **Get started** di website mengarah ke App (`/app`).

---

## Struktur project

```
ecosol-dao/
├── README.md                 # Dokumen ini
├── app/                      # Aplikasi Next.js (frontend)
│   ├── app/                  # App Router
│   │   ├── layout.tsx        # Root layout (header/footer marketing)
│   │   ├── page.tsx          # Home (/)
│   │   ├── about/
│   │   ├── how-it-works/
│   │   ├── suppliers/
│   │   ├── supplier/[id]/
│   │   ├── docs/             # Dokumentasi (litepaper, technical, faq, esg)
│   │   ├── governance/
│   │   ├── contact/
│   │   ├── app/              # dApp (setelah klik Get started)
│   │   │   ├── layout.tsx    # Layout app (WalletProvider, nav app)
│   │   │   ├── page.tsx      # /app (connect / redirect dashboard)
│   │   │   ├── dashboard/
│   │   │   ├── marketplace/
│   │   │   ├── asset/[id]/
│   │   │   ├── portfolio/
│   │   │   ├── certificate/[id]/
│   │   │   └── governance/   # overview, proposals, proposal/[id], create-proposal, vote, treasury
│   │   ├── admin/
│   │   └── burn/
│   ├── components/           # Komponen React
│   ├── lib/                  # Utilitas, data mock, Solana/Anchor
│   ├── next.config.js
│   ├── package.json
│   └── tailwind.config.js
├── programs/                 # (Opsional) Smart contracts Anchor
└── docs/                     # Dokumen tambahan (litepaper, technical, faq, esg)
```

---

## Cara menjalankan

### Prasyarat

- Node.js 18+
- npm atau yarn

### Langkah

1. **Instal dependensi**
   ```bash
   cd app
   npm install
   ```

2. **Jalankan development**
   ```bash
   npm run dev
   ```
   Buka **http://localhost:3000** (atau port yang ditampilkan).

3. **Build production**
   ```bash
   npm run build
   npm start
   ```

### Route penting

| Route        | Keterangan                    |
|-------------|--------------------------------|
| `/`         | Home (website)                |
| `/app`      | Entry dApp (connect → dashboard) |
| `/docs`     | Dokumentasi                   |
| `/governance` | Halaman marketing governance |

---

## Tech stack

- **Next.js 14** (App Router)
- **React 18**, **TypeScript**
- **Tailwind CSS**, **Framer Motion**
- **Solana** (wallet-adapter, web3.js, Anchor untuk program)

---

## Lisensi & kontribusi

MIT. Kontribusi diterima.

Untuk pertanyaan teknis atau akses dokumen lengkap, gunakan halaman [Contact](/contact) di website.
