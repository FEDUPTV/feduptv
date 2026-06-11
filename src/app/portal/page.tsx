import ApplicantsTable from "../../components/admin/ApplicantsTable";
import PortalStats from "../../components/admin/PortalStats";

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-2xl border border-yellow-500/20 bg-zinc-950 p-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-yellow-500">
            Casting Portal
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-black text-white md:text-5xl">
                Applicant Review
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-400 md:text-base">
                Track submissions, review candidate details, and move applicants
                through the FEDUP casting pipeline.
              </p>
            </div>
            <div className="rounded-xl border border-yellow-500/20 bg-black px-4 py-3 text-sm font-bold text-yellow-500">
              Producer Workspace
            </div>
          </div>
        </section>
        <PortalStats />
        <ApplicantsTable />
      </div>
    </main>
  );
}
