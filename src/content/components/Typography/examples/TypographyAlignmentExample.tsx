import React from "react";
import { Typography } from "@jobber/components/Typography";
import { ContentBlock } from "@jobber/components/ContentBlock";

export function TypographyAlignmentExample() {
  return (
    <ContentBlock maxWidth="100%">
      <Typography align="start">Start</Typography>
      <Typography align="center">Center</Typography>
      <Typography align="end">End</Typography>
    </ContentBlock>
  );
}
