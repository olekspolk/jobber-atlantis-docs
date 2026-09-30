import type { ComponentProps } from "react";
import React from "react";
import { Banner } from "@jobber/components/Banner";

export function BannerNoticeExample(
  props: Partial<ComponentProps<typeof Banner>>,
) {
  return (
    <Banner type="notice" {...props}>
      Your visits are being scheduled
    </Banner>
  );
}
