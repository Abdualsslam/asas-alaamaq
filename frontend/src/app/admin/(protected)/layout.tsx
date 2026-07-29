import { AdminShell } from "@/components/admin/AdminShell";
import { AuthGate } from "@/components/admin/AuthGate";

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
      <AdminShell>{children}</AdminShell>
    </AuthGate>
  );
}
