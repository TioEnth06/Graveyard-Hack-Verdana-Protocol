'use client';

const LOGOS = [
  { name: 'Solana', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/solana.svg', href: 'https://solana.com' },
  { name: 'Polygon', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/polygon.svg', href: 'https://polygon.technology' },
  { name: 'Ethereum', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ethereum.svg', href: 'https://ethereum.org' },
  { name: 'Chainlink', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/chainlink.svg', href: 'https://chain.link' },
  { name: 'Phantom', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ghost.svg', href: 'https://phantom.app' },
  { name: 'Vercel', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg', href: 'https://vercel.com' },
  { name: 'Cloudflare', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/cloudflare.svg', href: 'https://cloudflare.com' },
  { name: 'AWS', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazonaws.svg', href: 'https://aws.amazon.com' },
];

const DUPLICATE = [...LOGOS, ...LOGOS];

export function LogoCarouselSection() {
  return (
    <section className="section-container hero-logo-section w-full overflow-hidden py-8 border-t border-[var(--border)]">
      <div className="logo-carousel relative overflow-hidden">
        <ul
          className="logo-carousel__marquee flex animate-marquee gap-16"
          aria-hidden="true"
          style={{ width: 'max-content' }}
        >
          {DUPLICATE.map((logo, i) => (
            <li
              key={`${logo.name}-${i}`}
              className="logo-carousel__item flex shrink-0 items-center justify-center"
              style={{ minWidth: 64 }}
            >
              <a
                href={logo.href}
                target={logo.href.startsWith('http') ? '_blank' : undefined}
                rel={logo.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block"
              >
                <div className="flex h-6 w-16 items-center justify-center opacity-60 grayscale transition-opacity duration-200 hover:opacity-100 hover:grayscale-0">
                  {/* eslint-disable-next-line @next/next/no-img-element -- external CDN SVGs */}
                  <img
                    src={logo.src}
                    alt={logo.name}
                    width={64}
                    height={24}
                    className="max-h-6 w-auto max-w-16 object-contain object-center"
                    loading="eager"
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
