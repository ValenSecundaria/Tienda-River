import NextAuth from "next-auth";
import { authConfig } from "../../../../auth.config";  // ajustá la ruta

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };