"use client";

import { useAppDispatch } from "@repo/store/reduxHooks";
import { setUser } from "@repo/store/userFeature";
import { Appbar } from "@repo/ui/Appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AppbarClient = () => {
  const session = useSession();
  const router = useRouter();

  const dispatch = useAppDispatch();

  if (session.data?.user) {
    const newSession = session as any;
    dispatch(
      setUser({
        id: newSession.data.user.id,
        email: newSession.data.user.email,
        name: newSession.data.user.name,
      })
    );
  }

  return (
    <div>
      <Appbar
        user={session.data?.user}
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
      />
    </div>
  );
};

export default AppbarClient;
