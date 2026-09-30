import React from "react";
import { Frame } from "@jobber/components/Frame";

export function FrameFourByThreeExample() {
  return (
    <Frame aspectX={4} aspectY={3}>
      <img
        src="https://placehold.co/600x400?text=Classic+photo"
        alt="Classic photo"
      />
    </Frame>
  );
}
