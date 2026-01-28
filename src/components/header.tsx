"use client";

import { ModeToggle } from "./mode-toggle";

export function Header() {

  return (
    <header className="flex mx-4 mt-4">
      <div className="flex gap-4 pb-4 justify-center">
        <ModeToggle />
      </div>
    </header>
  );
}
