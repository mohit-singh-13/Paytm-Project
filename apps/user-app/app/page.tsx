// "use client";
import Counter from "./counter";
import StoreProvider from "./StoreProvider";
import React from "react";

export default function Home() {
  return (
    <StoreProvider>
      <Counter />
    </StoreProvider>
  );
}
