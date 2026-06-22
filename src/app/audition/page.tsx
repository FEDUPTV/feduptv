import Link from "next/link";

const overview = [
  ["Audition city", "Orlando, Florida"],
  ["Audition day", "July 11, 2026"],
  ["Weekend window", "July 10-12, 2026"],
  ["Application status", "Apply before arrival"],
];

const bringItems = [
  "Government-issued photo ID",
  "Application confirmation",
  "Any approved supporting documents connected to your story",
  "Comfortable, camera-appropriate attire",
  "A clear understanding of the story you are ready to tell",
];

const faqs = [
  [
    "Does applying guarantee an audition?",
    "No. Applications are reviewed by the casting team before next steps are confirmed.",
  ],
  [
    "Are hotel accommodations available?",
    "Hotel and travel details may be provided to registered or selected applicants as appropriate.",
  ],
  [
    "Will travel expenses be covered?",
    "Any production-supported travel details will be communicated directly to selected participants.",
  ],
  [
    "Can family members attend?",
    "Guest and support-person guidance will be provided to selected applicants when available.",
  ],
];

export default function AuditionPage() {
  return (
    <main className="bg-[#080808] text-[#F4EFE6]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-20 md:px-6 md:py-28">
        <div className="absolute inset-0 opacity-40">
          <img
            src="/images/fedup_banner.png"
            alt="FEDUP audition"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/88 to-[#080808]/45" />
        <div className="relative mx-auto max-w-7xl">
          <p className="fedup-kicker">Audition Weekend</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[0.92] md:text-7xl">
            FEDUP Orlando Audition Hub
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D8D2C4]">
            Everything applicants need to know before stepping into the FEDUP
            casting process in Orlando.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/apply" className="fedup-solid-button">
              Apply Now
            </Link>
            <a href="#details" className="fedup-ghost-button">
              View Details
            </a>
          </div>
        </div>
      </section>

      <section id="details" className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <div className="grid gap-5 md:grid-cols-4">
          {overview.map(([label, value]) => (
            <div key={label} className="bg-[#111] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[#AFA79A]">
                {label}
              </p>
              <p className="mt-4 text-2xl leading-tight text-[#F4EFE6]">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0B0B0C] px-5 py-16 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="fedup-kicker">Date and location</p>
            <h2 className="fedup-editorial-title">Orlando is the room.</h2>
            <p className="mt-6 text-base leading-7 text-[#AFA79A]">
              FEDUP auditions are centered in Orlando, Florida on July 11, 2026.
              Applicants should complete the application first so the casting
              team can review story details before the event.
            </p>
          </div>
          <div className="space-y-8">
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-3xl text-[#F4EFE6]">Hotel and Travel</h3>
              <p className="mt-4 text-lg text-[#D8D2C4]">
                Embassy Suites by Hilton Orlando International Drive Convention
                Center
              </p>
              <div className="mt-4 space-y-1 text-sm leading-6 text-[#AFA79A]">
                <p>8978 International Drive</p>
                <p>Orlando, FL 32819</p>
                <p>(407) 352-1400</p>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#AFA79A]">
                Hotel information is provided professionally for planning. Any
                private codes or applicant-specific travel instructions should
                only be shared through approved casting communication.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="tel:+14073521400" className="fedup-solid-button">
                  Call Hotel
                </a>
                <a
                  href="https://www.hilton.com/en/hotels/orlies-embassy-suites-orlando-international-drive-convention-center/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fedup-ghost-button"
                >
                  Hotel Website
                </a>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-3xl text-[#F4EFE6]">What To Bring</h3>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#D8D2C4]">
                {bringItems.map((item) => (
                  <li key={item} className="border-l-2 border-[#7A1F24] pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        <div className="mb-10">
          <p className="fedup-kicker">FAQ</p>
          <h2 className="fedup-editorial-title">Before you arrive.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <div key={question} className="bg-[#101010] p-6">
              <h3 className="text-xl text-[#F4EFE6]">{question}</h3>
              <p className="mt-4 text-sm leading-7 text-[#AFA79A]">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#111] px-5 py-16 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="fedup-kicker">Casting CTA</p>
            <h2 className="mt-3 text-4xl leading-tight text-[#F4EFE6] md:text-5xl">
              Your story starts with the application.
            </h2>
          </div>
          <Link href="/apply" className="fedup-solid-button">
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  );
}
