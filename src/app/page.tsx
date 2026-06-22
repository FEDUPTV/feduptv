import Link from "next/link";
import StoryCard from "../components/content/StoryCard";
import SocialPostCard from "../components/content/SocialPostCard";
import JudgeCard from "../components/content/JudgeCard";
import QuoteBlock from "../components/content/QuoteBlock";
import {
  auditionInfo,
  featuredStories,
  heroMedia,
  instagramPosts,
  judgeAnnouncements,
  pressOrMedia,
  realQuotes,
  socialProof,
} from "../lib/fedupContent";

export default function HomePage() {
  const hero = heroMedia[0];

  return (
    <main className="overflow-hidden bg-[#080808] text-[#F4EFE6]">
      <section className="relative min-h-[calc(100vh-82px)] w-full overflow-hidden">
        <div className="absolute inset-0">
          {hero?.videoUrl ? (
            <video
              src={hero.videoUrl}
              poster={hero.imageUrl}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : hero?.imageUrl ? (
            <img
              src={hero.imageUrl}
              alt="FEDUP Reality Series"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[#111]" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/78 to-[#080808]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl items-end px-5 pb-12 pt-24 md:px-6 md:pb-16">
          <div className="fedup-mobile-copy max-w-4xl md:max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[#D6B45A]">
              {hero?.category || "Casting Now"}
            </p>
            <h1 className="fedup-mobile-copy text-5xl leading-[0.9] text-[#F4EFE6] md:max-w-5xl md:text-7xl lg:text-8xl">
              FEDUP Reality Series
            </h1>
            <p className="fedup-mobile-copy mt-5 text-2xl leading-tight text-[#D8D2C4] md:max-w-none md:text-4xl">
              Raw Stories. Real Women. Real Purpose.
            </p>
            <p className="fedup-mobile-copy mt-6 text-base leading-7 text-[#D8D2C4] md:max-w-2xl md:text-xl md:leading-8">
              FEDUP follows women who have lived through defeat, rebuilt with
              purpose, and are ready for the camera to meet the truth.
            </p>
            {hero?.quote && (
              <p className="fedup-mobile-copy mt-5 border-l-2 border-[#7A1F24] pl-5 text-lg leading-7 text-[#F4EFE6] md:max-w-2xl md:text-2xl">
                &quot;{hero.quote}&quot;
              </p>
            )}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/apply" className="fedup-solid-button">
                Apply Now
              </Link>
              <Link href="/audition" className="fedup-ghost-button">
                Audition Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0B0B0C]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-6 text-sm uppercase tracking-[0.22em] text-[#AFA79A] md:grid-cols-3 md:px-6">
          <span>Females Ending Defeat</span>
          <span className="text-[#D6B45A]">Unleashing Purpose</span>
          <span className="md:text-right">Orlando - July 11, 2026</span>
        </div>
      </section>

      <section className="bg-[#111111] px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <QuoteBlock item={realQuotes[1]} />
          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#D8D2C4]">
            Females Ending Defeat. Unleashing Purpose.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0B0C] px-5 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="fedup-kicker">Social proof</p>
            <h2 className="text-3xl text-[#F4EFE6] md:text-5xl">
              The movement is already public.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {socialProof.map((item) => (
              <a
                key={item.title}
                href={item.instagramUrl || "#"}
                target={item.instagramUrl ? "_blank" : undefined}
                rel={item.instagramUrl ? "noopener noreferrer" : undefined}
                className="bg-[#111] p-5 transition hover:bg-[#161616]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-[#AFA79A]">
                  {item.category}
                </p>
                <h3 className="mt-4 text-4xl text-[#F4EFE6]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#D6B45A]">{item.subtitle}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="fedup-kicker">Who is involved</p>
            <h2 className="fedup-editorial-title">
              Real Channels. Real Energy.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#AFA79A]">
              FEDUP is not an anonymous template launch. The public social
              channels are live, branded, and already carrying casting language.
            </p>
          </div>
          <div>
            {judgeAnnouncements.map((judge) => (
              <JudgeCard key={`${judge.title}-${judge.handle}`} item={judge} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B0B0C] px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="fedup-kicker">Production moments</p>
            <h2 className="fedup-editorial-title">Real Media In Motion.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {pressOrMedia.map((item) => (
              <SocialPostCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-28">
        <div className="mb-10 max-w-3xl">
          <p className="fedup-kicker">What stories are being told</p>
          <h2 className="fedup-editorial-title">Real Women. Real Stories.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredStories.map((story) => (
            <StoryCard key={`${story.title}-${story.handle}`} item={story} />
          ))}
        </div>
      </section>

      <section className="bg-[#0B0B0C] px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="fedup-kicker">From the feed</p>
              <h2 className="fedup-editorial-title">Latest From FEDUP</h2>
            </div>
            <a
              href="https://www.instagram.com/fedddup_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B45A]"
            >
              Follow @fedddup_
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {instagramPosts.map((post) => (
              <SocialPostCard key={`${post.title}-${post.handle}`} item={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:px-6 md:py-28 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="fedup-kicker">Auditions</p>
          <h2 className="fedup-editorial-title">Orlando, Florida</h2>
          <p className="mt-4 text-3xl text-[#D6B45A]">July 11, 2026</p>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#AFA79A] md:text-lg">
            FEDUP is casting women with real stories, real stakes, and the
            courage to let the camera meet the truth.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/apply" className="fedup-solid-button">
              Apply Now
            </Link>
            <Link href="/audition" className="fedup-ghost-button">
              Audition Details
            </Link>
          </div>
        </div>
        <div className="space-y-4 bg-[#0F0F10] p-6">
          {auditionInfo.map((item) => (
            <div key={item.title} className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[#C6A04A]">
                {item.subtitle}
              </p>
              <h3 className="mt-2 text-2xl text-[#F4EFE6]">{item.title}</h3>
              {item.date && <p className="mt-1 text-[#D8D2C4]">{item.date}</p>}
              {item.caption && (
                <p className="mt-3 text-sm leading-6 text-[#AFA79A]">
                  {item.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

