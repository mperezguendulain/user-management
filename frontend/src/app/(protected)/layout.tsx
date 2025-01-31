"use client";
import type { ReactNode } from "react";
import { Stack } from "@mui/material";
import { NavBar } from "@/components/NavBar/NavBar";

export default function PrivateLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <Stack flexGrow={1} alignItems="center">
      <NavBar />
      <Stack width="80%" flexGrow={1} marginY={4}>
        {children}
      </Stack>
    </Stack>
  );
}
