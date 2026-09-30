import React from "react";
import { Frame } from "@jobber/components/Frame";

export function FrameSquareExample() {
  return (
    <Frame aspectX={1} aspectY={1}>
      <img
        src="https://placehold.co/600x400?text=Profile+photo"
        alt="Profile photo"
      />
    </Frame>
  );
}
