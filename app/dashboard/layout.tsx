import UserProvider from "@/context/user-context";
import UserLayout from "@/components/layout/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <UserLayout>{children}</UserLayout>
    </UserProvider>
  );
}
