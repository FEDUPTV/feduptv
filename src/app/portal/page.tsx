import ApplicantsTable from "../../components/admin/ApplicantsTable";
import PortalStats from "../../components/admin/PortalStats";
import PortalGuard from "../../components/admin/PortalGuard";

export default function PortalPage() {
  return (
    <PortalGuard>
      <main className="min-h-screen bg-black p-6 text-white md:p-10">
        <h1 className="mb-8 text-4xl font-black text-yellow-500 md:text-5xl">
          FED UP Casting Portal
        </h1>

        <PortalStats />
        <ApplicantsTable />
      </main>
    </PortalGuard>
  );
}
