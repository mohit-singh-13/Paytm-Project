import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) {
    console.log("MOHIT SINGH");
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}
