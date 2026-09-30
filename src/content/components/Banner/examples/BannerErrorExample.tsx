import type { ComponentProps } from "react";
import React from "react";
import { Banner } from "@jobber/components/Banner";

export function BannerErrorExample(
  props: Partial<ComponentProps<typeof Banner>>,
) {
  return (
    <Banner type="error" icon="alert" {...props}>
      Your changes couldn&apos;t be saved. Check your connection and try again.
    </Banner>
  );
}
