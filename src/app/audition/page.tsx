export default function AuditionPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-4 text-center text-5xl font-black text-yellow-500">
          FEDUP Audition Weekend
        </h1>

        <p className="mb-10 text-center text-lg text-gray-300">
          Important information for registered applicants attending the FEDUP Reality Series auditions.
        </p>

        <div className="grid gap-6">

          <section className="rounded-xl border border-yellow-500/20 bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-black text-yellow-500">
              Event Overview
            </h2>

            <p><strong>Audition Weekend:</strong> July 10-12, 2026</p>
            <p><strong>Audition Day:</strong> July 11, 2026</p>
            <p><strong>Location:</strong> Orlando, Florida</p>
          </section>

          <section className="rounded-xl border border-yellow-500/20 bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-black text-yellow-500">
              Hotel & Travel
            </h2>

            <p className="mb-2">
              Embassy Suites by Hilton Orlando International Drive Convention Center
            </p>

            <p>8978 International Drive</p>
            <p>Orlando, FL 32819</p>
            <p>(407) 352-1400</p>

            <div className="mt-4 rounded-lg border border-yellow-500/20 bg-black p-4">
              <p className="font-bold text-yellow-500">
                Hotel discount information is provided to registered applicants.
              </p>
              <p className="mt-2 text-sm text-gray-300">
                If the Hilton event page does not load, call the hotel directly
                and ask for the FEDUP July 2026 Auditions room block.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+14073521400"
                className="inline-block rounded-lg bg-yellow-500 px-6 py-3 text-center font-black text-black"
              >
                Call Hotel
              </a>

              <a
                href="https://www.hilton.com/en/hotels/orlies-embassy-suites-orlando-international-drive-convention-center/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border border-yellow-500 px-6 py-3 text-center font-black text-yellow-500"
              >
                Hotel Website
              </a>

              <a
                href="https://www.hilton.com/en/attend-my-event/fed-up-july-2026-auditions/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border border-zinc-700 px-6 py-3 text-center font-bold text-gray-300"
              >
                Event Link
              </a>
            </div>
          </section>

          <section className="rounded-xl border border-yellow-500/20 bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-black text-yellow-500">
              What To Bring
            </h2>

            <ul className="list-disc space-y-2 pl-6 text-gray-300">
              <li>Government-issued photo ID</li>
              <li>Application confirmation</li>
              <li>Supporting documents related to your story</li>
              <li>Comfortable attire</li>
              <li>A positive attitude</li>
            </ul>
          </section>

          <section className="rounded-xl border border-yellow-500/20 bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-black text-yellow-500">
              Important Dates
            </h2>

            <p><strong>Hotel Booking Deadline:</strong> July 2, 2026</p>
            <p><strong>Check-In:</strong> July 10, 2026</p>
            <p><strong>Audition Day:</strong> July 11, 2026</p>
            <p><strong>Departure:</strong> July 12, 2026</p>
          </section>

          <section className="rounded-xl border border-yellow-500/20 bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-black text-yellow-500">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 text-gray-300">
              <p><strong>Does applying guarantee an audition?</strong><br />No. Applications are reviewed by the casting team.</p>

              <p><strong>Are hotel accommodations available?</strong><br />Discounted accommodations may be available for eligible participants.</p>

              <p><strong>Will travel expenses be covered?</strong><br />Additional details will be provided to selected applicants.</p>

              <p><strong>Can family members attend?</strong><br />Information will be provided to selected participants.</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
