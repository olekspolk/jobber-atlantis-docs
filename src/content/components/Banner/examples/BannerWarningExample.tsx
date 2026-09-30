import type { ComponentProps } from "react";
import React from "react";
import { Banner } from "@jobber/components/Banner";

export function BannerWarningExample(
  props: Partial<ComponentProps<typeof Banner>>,
) {
  return (
    <Banner type="warning" {...props}>
      Your subscription will be automatically upgraded in 8 days
    </Banner>
  );
}
