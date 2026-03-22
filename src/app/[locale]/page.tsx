'use client'

import { useEffect, useState, Suspense, lazy } from 'react'
import { ArrowRight, Check, Copy, ExternalLink, Sparkles } from 'lucide-react'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { NativeBannerAd, AdBanner, SidebarAd } from '@/components/ads'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'

const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

export default function HomePage() {
  const t = useMessages() as any
  const loadingText = t.common?.loading || 'Loading Cursed Gear content...'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cursedgear.wiki'

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Cursed Gear Wiki',
        description: 'Cursed Gear resource hub with guides for gears, techniques, clans, expeditions, builds, and progression.',
        image: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          caption: 'Cursed Gear - Roblox Action RPG',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Cursed Gear Wiki',
        alternateName: 'Cursed Gear',
        url: siteUrl,
        description: 'Community resource hub for Cursed Gear guides, systems, and progression.',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        sameAs: [
          'https://www.roblox.com/games/10154506972/Cursed-Gear',
          'https://www.roblox.com/communities/15291380/Monad-Studios-West',
          'https://discord.gg/cgofficial',
          'https://trello.com/b/zyHFkkSS/cursed-gear-trello',
          'https://www.youtube.com/watch?v=oXR-18ZEXUA',
        ],
      },
      {
        '@type': 'VideoGame',
        name: 'Cursed Gear',
        gamePlatform: ['Roblox'],
        applicationCategory: 'Game',
        genre: ['Action RPG', 'Dark Fantasy', 'Anime'],
      },
    ],
  }

  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(text)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="sticky top-20 z-20 border-b border-border py-2 bg-background/95 backdrop-blur-sm">
        <AdBanner
          type="banner-320x50"
          adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50}
        />
      </div>

      <div className="hidden lg:block fixed left-4 top-24 z-10">
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </div>

      <div className="hidden lg:block fixed right-4 top-24 z-10">
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </div>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-8 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border-2 border-[hsl(var(--gold)/0.5)] mb-6 glow-gold">
              <Sparkles className="w-4 h-4 text-[hsl(var(--gold))]" />
              <span className="text-sm font-semibold">{t.hero.badge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bebas mb-6 leading-tight bg-gradient-to-r from-foreground via-[hsl(var(--nav-theme))] to-foreground bg-clip-text text-transparent">
              {t.hero.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://discord.gg/cgofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white rounded-lg font-semibold text-lg transition-all duration-300"
              >
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://www.roblox.com/games/10154506972/Cursed-Gear"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[hsl(var(--gold)/0.5)] hover:bg-[hsl(var(--gold)/0.1)] rounded-lg font-semibold text-lg transition-all duration-300"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="h-32 bg-white/5 border border-border rounded-xl animate-pulse flex items-center justify-center">
                <div className="text-muted-foreground">{loadingText}</div>
              </div>
            }
          >
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId="oXR-18ZEXUA"
              title={t.gameFeature.title}
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
      />

      <section className="px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4">
              {t.tools.title} <span className="text-gold-gradient">{t.tools.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t.tools.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              const targetKey = t.modules.sectionOrder[index]
              const targetSection = t.modules.items[targetKey]

              return (
                <button
                  key={card.title}
                  onClick={() => scrollToSection(targetSection.id)}
                  className="scroll-reveal group p-6 rounded-xl border-2 border-border bg-card hover:border-[hsl(var(--gold)/0.6)] transition-all duration-300 cursor-pointer text-left hover:-translate-y-1"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg mb-4 bg-gradient-to-br from-[hsl(var(--nav-theme)/0.1)] to-[hsl(var(--gold)/0.1)] border-2 border-[hsl(var(--gold)/0.3)] flex items-center justify-center group-hover:border-[hsl(var(--gold))] transition-all duration-300">
                    <DynamicIcon
                      name={card.icon}
                      className="w-6 h-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="font-bebas text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
      />

      {t.modules.sectionOrder.map((key: string, index: number) => {
        const section = t.modules.items[key]
        const isMuted = index % 2 === 1

        return (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-24 px-4 py-20 scroll-reveal ${isMuted ? 'bg-muted/30' : ''}`}
          >
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bebas mb-4">{section.title}</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{section.subtitle}</p>
              </div>

              {section.codeEntries && section.codeEntries.length > 0 && (
                <div className="mb-8 space-y-4">
                  {section.codeEntries.map((entry: any) => (
                    <div key={entry.code} className="p-5 rounded-xl bg-card border-2 border-[hsl(var(--gold)/0.4)]">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                        <p className="font-bebas text-2xl text-gold-gradient">{entry.code}</p>
                        <button
                          onClick={() => copyToClipboard(entry.code)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme))] text-white"
                        >
                          <Copy className="w-4 h-4" />
                          {copiedCode === entry.code ? t.modules.copied : t.modules.copyCode}
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.status}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.overview && section.overview.length > 0 && (
                <div className="mb-8">
                  {section.overviewTitle && (
                    <h3 className="text-2xl font-bebas mb-4 text-[hsl(var(--nav-theme-light))]">{section.overviewTitle}</h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.overview.map((item: string) => (
                      <div key={item} className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
                        <Check className="w-4 h-4 mt-0.5 text-[hsl(var(--nav-theme))]" />
                        <p className="text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.links && section.links.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {section.links.map((linkItem: any) => (
                    <a
                      key={linkItem.url}
                      href={linkItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-lg bg-card border border-border hover:border-[hsl(var(--nav-theme))] transition-all duration-300"
                    >
                      <p className="font-semibold mb-2">{linkItem.label}</p>
                      <p className="text-xs text-muted-foreground mb-2">{linkItem.meta}</p>
                      <span className="inline-flex items-center gap-1 text-[hsl(var(--nav-theme-light))] text-sm">
                        {t.modules.openLink}
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {section.cards && section.cards.length > 0 && (
                <div className="mb-8">
                  {section.cardsTitle && (
                    <h3 className="text-2xl font-bebas mb-4 text-[hsl(var(--nav-theme-light))]">{section.cardsTitle}</h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {section.cards.map((card: any) => (
                      <article key={card.title} className="p-5 rounded-xl bg-card border border-border hover:border-[hsl(var(--nav-theme)/0.6)] transition-all duration-300">
                        {card.icon && (
                          <div className="w-10 h-10 rounded-lg mb-3 bg-[hsl(var(--nav-theme)/0.12)] border border-[hsl(var(--gold)/0.35)] flex items-center justify-center">
                            <DynamicIcon
                              name={card.icon}
                              className="w-5 h-5 text-[hsl(var(--nav-theme-light))]"
                            />
                          </div>
                        )}
                        <h3 className="text-lg font-bebas mb-2 text-[hsl(var(--nav-theme-light))]">{card.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{card.description}</p>
                        {card.points && card.points.length > 0 && (
                          <ul className="space-y-2">
                            {card.points.map((point: string) => (
                              <li key={point} className="text-sm flex items-start gap-2">
                                <Check className="w-4 h-4 mt-0.5 text-[hsl(var(--gold))]" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {section.statCards && section.statCards.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {section.statCards.map((item: any) => (
                    <article key={item.stat} className="p-5 rounded-xl bg-card border border-border hover:border-[hsl(var(--gold)/0.5)] transition-all duration-300">
                      <h3 className="text-lg font-bebas mb-2 text-[hsl(var(--nav-theme-light))]">{item.stat}</h3>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </article>
                  ))}
                </div>
              )}

              {section.tagGrid && section.tagGrid.length > 0 && (
                <div className="mb-8">
                  {section.tagGridTitle && (
                    <h3 className="text-2xl font-bebas mb-4 text-[hsl(var(--nav-theme-light))]">{section.tagGridTitle}</h3>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {section.tagGrid.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-2 rounded-full text-sm border border-[hsl(var(--gold)/0.35)] bg-[hsl(var(--nav-theme)/0.08)] text-[hsl(var(--nav-theme-light))]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {section.infoTable && section.infoTable.columns && section.infoTable.rows && (
                <div className="mb-8 rounded-xl border border-border bg-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-[hsl(var(--nav-theme)/0.12)]">
                        <tr>
                          {section.infoTable.columns.map((column: string) => (
                            <th
                              key={column}
                              className="px-4 py-3 text-left font-semibold text-[hsl(var(--nav-theme-light))]"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.infoTable.rows.map((row: string[], rowIndex: number) => (
                          <tr key={`${row[0]}-${rowIndex}`} className="border-t border-border/70">
                            {row.map((cell: string, cellIndex: number) => (
                              <td key={`${cell}-${cellIndex}`} className="px-4 py-3 align-top">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {section.comparisonTable && section.comparisonTable.columns && section.comparisonTable.rows && (
                <div className="mb-8 rounded-xl border-2 border-[hsl(var(--gold)/0.35)] bg-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-[hsl(var(--gold)/0.12)]">
                        <tr>
                          {section.comparisonTable.columns.map((column: string) => (
                            <th key={column} className="px-4 py-3 text-left font-semibold text-[hsl(var(--nav-theme-light))]">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.comparisonTable.rows.map((row: string[], rowIndex: number) => (
                          <tr key={`${row[0]}-${rowIndex}`} className="border-t border-border/70">
                            {row.map((cell: string, cellIndex: number) => (
                              <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {section.tips && section.tips.length > 0 && (
                <div className="p-5 rounded-xl border border-[hsl(var(--gold)/0.35)] bg-[hsl(var(--gold)/0.06)] mb-8">
                  <ul className="space-y-2">
                    {section.tips.map((tip: string) => (
                      <li key={tip} className="text-sm flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 text-[hsl(var(--gold))]" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.steps && section.steps.length > 0 && (
                <div className="mb-8">
                  {section.stepsTitle && (
                    <h3 className="text-2xl font-bebas mb-4 text-[hsl(var(--nav-theme-light))]">{section.stepsTitle}</h3>
                  )}
                  <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.steps.map((step: string, stepIndex: number) => (
                      <li key={step} className="p-4 rounded-lg bg-card border border-border flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[hsl(var(--nav-theme))] text-white text-xs font-semibold flex items-center justify-center mt-0.5">
                          {stepIndex + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {section.moduleFaq && section.moduleFaq.length > 0 && (
                <div className="space-y-3">
                  {section.moduleFaq.map((qa: any) => (
                    <details key={qa.q} className="rounded-lg border border-border bg-card p-4 group">
                      <summary className="cursor-pointer font-medium text-[hsl(var(--nav-theme-light))]">{qa.q}</summary>
                      <p className="text-sm text-muted-foreground mt-3">{qa.a}</p>
                    </details>
                  ))}
                </div>
              )}
            </div>

            {(index + 1) % 4 === 0 && (
              <AdBanner
                type="banner-468x60"
                adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
                className="my-8"
              />
            )}
          </section>
        )
      })}

      <Suspense
        fallback={
          <div className="h-64 bg-white/5 border border-border rounded-xl animate-pulse flex items-center justify-center">
            <div className="text-muted-foreground">{loadingText}</div>
          </div>
        }
      >
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-64 bg-white/5 border border-border rounded-xl animate-pulse flex items-center justify-center">
            <div className="text-muted-foreground">{loadingText}</div>
          </div>
        }
      >
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">{t.footer.title}</h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                {t.footer.communityLinks.map((item: any) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                {t.footer.legalLinks.map((item: any) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
