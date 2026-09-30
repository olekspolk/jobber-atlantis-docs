import { Box } from "@jobber/components/Box";
import { Button } from "@jobber/components/Button";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { useEffect } from "react";
import { useRouteError } from "react-router-dom";

// A page that failed to load or render (its document's chunk gone after a deploy, a dropped
// connection): the navigation stays, and a reload fetches the page again.
export const RouteError = () => {
  const error = useRouteError();
  useEffect(() => console.error(error), [error]);
  return (
    <Box padding="extravagant" gap="base" alignItems="center">
      <Heading level={1}>Something went wrong</Heading>
      <Text align="center">This page couldn't be loaded. Reloading usually brings it back.</Text>
      <Button label="Reload" onClick={() => window.location.reload()} />
    </Box>
  );
};
