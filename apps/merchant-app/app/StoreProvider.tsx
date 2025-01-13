"use client";

import React, { useRef } from "react";
import { AppStore, store } from "@repo/store/reduxStore";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
  }

  return (
    <Provider store={storeRef.current}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
};

export default StoreProvider;
