"use server"

import { signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function CloseSesion() {
  await signOut({ redirectTo: "/login" })
  redirect("/login")
}
