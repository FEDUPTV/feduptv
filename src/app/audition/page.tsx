const infoSections = [
  {
    title: "Event Overview",
    body: [
      ["Audition Weekend", "July 10-12, 2026"],
      ["Audition Day", "July 11, 2026"],
      ["Location", "Orlando, Florida"],
    ],
  },
  {
    title: "Important Dates",
    body: [
      ["Hotel Booking Deadline", "July 2, 2026"],
      ["Check-In", "July 10, 2026"],
      ["Audition Day", "July 11, 2026"],
      ["Departure", "July 12, 2026"],
    ],
  },
];

export default function AuditionPage() {
  return (
    <main className="cinematic-shell min-h-screen px-5 py-12 text-[#17130e] md:py-20">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 max-w-4xl">
          <p className="fedup-eyebrow mb-5">Audition Weekend</p>
          <h1 className="fedup-title text-5xl md:text-7xl">FEDUP Audition Weekend</h1>
          <p className="fedup-body mt-6 text-lg md:text-xl">
            Important information for registered applicants attending FEDUP Reality Series auditions in Orlando.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          {infoSections.map((section) => (
            <section key={section.title} className="premium-card p-7">
              <h2 className="mb-5 text-2xl font-black text-[#E5C76B]">{section.title}</h2>
              <div className="space-y-3 text-[#5c5144]">
                {section.body.map(([label, value]) => (
                  <p key={label}>
                    <strong className="text-[#17130e]">{label}:</strong> {value}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="premium-card mt-5 p-7">
          <h2 className="mb-5 text-2xl font-black text-[#E5C76B]">Hotel & Travel</h2>
          <p className="mb-3 text-lg text-[#17130e]">Embassy Suites by Hilton Orlando International Drive Convention Center</p>
          <div className="space-y-1 text-[#5c5144]">
            <p>8978 International Drive</p>
            <p>Orlando, FL 32819</p>
            <p>(407) 352-1400</p>
          </div>

          <div className="mt-6 bg-[#f1e5d2] p-5">
            <p className="font-bold text-[#E5C76B]">Hotel discount information is provided to registered applicants.</p>
            <p className="mt-2 text-sm leading-6 text-[#5c5144]">
              If the Hilton event page does not load, call the hotel directly and ask for the FEDUP July 2026 Auditions room block.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="tel:+14073521400" className="premium-button rounded-sm px-6 py-3 text-sm">Call Hotel</a>
            <a href="https://www.hilton.com/en/hotels/orlies-embassy-suites-orlando-international-drive-convention-center/" target="_blank" rel="noopener noreferrer" className="premium-button-secondary rounded-sm px-6 py-3 text-sm">Hotel Website</a>
            <a href="https://www.hilton.com/en/attend-my-event/fed-up-july-2026-auditions/" target="_blank" rel="noopener noreferrer" className="rounded-sm border border-[#17130e]/15 px-6 py-3 text-center text-sm font-black uppercase tracking-[0.06em] text-[#5c5144] transition hover:border-[#B9932F] hover:text-[#17130e]">Event Link</a>
          </div>
        </section>

        <section className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="premium-card p-7">
            <h2 className="mb-5 text-2xl font-black text-[#E5C76B]">What To Bring</h2>
            <ul className="list-disc space-y-3 pl-5 text-[#5c5144]">
              <li>Government-issued photo ID</li>
              <li>Application confirmation</li>
              <li>Supporting documents related to your story</li>
              <li>Comfortable attire</li>
              <li>A positive attitude</li>
            </ul>
          </div>

          <div className="premium-card p-7">
            <h2 className="mb-5 text-2xl font-black text-[#E5C76B]">Frequently Asked Questions</h2>
            <div className="space-y-4 text-[#5c5144]">
              <p><strong className="text-[#17130e]">Does applying guarantee an audition?</strong><br />No. Applications are reviewed by the casting team.</p>
              <p><strong className="text-[#17130e]">Are hotel accommodations available?</strong><br />Discounted accommodations may be available for eligible participants.</p>
              <p><strong className="text-[#17130e]">Will travel expenses be covered?</strong><br />Additional details will be provided to selected applicants.</p>
              <p><strong className="text-[#17130e]">Can family members attend?</strong><br />Information will be provided to selected participants.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
