// app/dashboard/layout.tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import ClientLayout from "./ClientLayout"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return <ClientLayout>{children}</ClientLayout>
}
