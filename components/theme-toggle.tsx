"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "./common/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="fixed right-2 top-2"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} theme
    </Button>
  );
}
