import type { ComponentProps } from "react";
import React from "react";
import { Banner } from "@jobber/components/Banner";

export function BannerSuccessVariantExample(
  props: Partial<ComponentProps<typeof Banner>>,
) {
  return (
    <Banner type="success" {...props}>
      You&apos;ve connected your bank account and can start receiving payouts.
    </Banner>
  );
}
