import PortalGuard from "../../components/admin/PortalGuard";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalGuard>{children}</PortalGuard>;
}
