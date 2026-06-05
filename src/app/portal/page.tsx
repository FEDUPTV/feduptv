import ApplicantsTable from "../../components/admin/ApplicantsTable";
import PortalStats from "../../components/admin/PortalStats";
import PortalGuard from "../../components/admin/PortalGuard";

export default function PortalPage() {
  return (
    <PortalGuard>
      <main className="min-h-screen pb-24 md:pb-0 bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl space-y-8">
          <PortalStats />
          <ApplicantsTable />
        </div>
      </main>
    </PortalGuard>
  );
}
