import React from "react";
import { Cover } from "@jobber/components/Cover";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

export function CoverCenterExample() {
  return (
    <Cover minHeight="40vh">
      <Cover.Center>
        <Heading>Welcome back!</Heading>
        <Text>Sign in to continue to your account.</Text>
      </Cover.Center>
    </Cover>
  );
}
