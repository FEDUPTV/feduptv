import ApplicantsTable from "../../components/admin/ApplicantsTable";
import PortalStats from "../../components/admin/PortalStats";

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <PortalStats />
        <ApplicantsTable />
      </div>
    </main>
  );
}
