import ApplicantsTable from "../../components/admin/ApplicantsTable";
import PortalStats from "../../components/admin/PortalStats";

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-[#17130e] px-4 py-6 text-[#f7efe2] md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="premium-card p-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-[#E5C76B]">
            Casting Portal
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-black text-[#f7efe2] md:text-5xl">
                Applicant Review
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-400 md:text-base">
                Track submissions, review candidate details, and move applicants
                through the FEDUP casting pipeline.
              </p>
            </div>
            <div className="border border-[#f7efe2]/10 bg-[#120f0b] px-4 py-3 text-sm font-bold text-[#DCC06A]">
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
