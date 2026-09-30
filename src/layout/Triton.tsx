import { Box } from "@jobber/components/Box";
import { Button } from "@jobber/components/Button";
import { Heading } from "@jobber/components/Heading";
import { Icon } from "@jobber/components/Icon";
import { SideDrawer } from "@jobber/components/SideDrawer";
import { Text } from "@jobber/components/Text";
import { Tooltip } from "@jobber/components/Tooltip";
import { type ReactNode, createContext, useContext, useState } from "react";
import site from "../../site.config.json";

// Triton, the site's AI assistant. It answers through Jobber's own service, which accepts requests
// from the original site only, so the replica keeps its button and drawer and points there.
const TRITON_SITE = "https://atlantis-ai.jobber.dev";

interface Triton {
  readonly tritonOpen: boolean;
  readonly onOpenTriton: () => void;
  readonly onCloseTriton: () => void;
}

const TritonContext = createContext<Triton>({ tritonOpen: false, onOpenTriton: () => {}, onCloseTriton: () => {} });

export const useTritonChat = () => useContext(TritonContext);

export function TritonProvider({ children }: { children: ReactNode }) {
  const [tritonOpen, setTritonOpen] = useState(false);
  return (
    <TritonContext.Provider
      value={{ tritonOpen, onOpenTriton: () => setTritonOpen(true), onCloseTriton: () => setTritonOpen(false) }}
    >
      {children}
    </TritonContext.Provider>
  );
}

export function TritonSideDrawer() {
  const { tritonOpen, onCloseTriton } = useTritonChat();
  return (
    <SideDrawer open={tritonOpen} onRequestClose={onCloseTriton}>
      <SideDrawer.Title>Triton</SideDrawer.Title>
      <SideDrawer.Actions>
        <Tooltip message="Visit Triton Site">
          <Button ariaLabel="Visit Triton Site" icon="export" type="secondary" variation="subtle" url={TRITON_SITE} />
        </Tooltip>
      </SideDrawer.Actions>
      <Box padding={{ left: "base", right: "base", bottom: "base" }} direction="column" height="grow">
        <Box
          padding="larger"
          gap="base"
          alignItems="center"
          margin={{ bottom: "base" }}
          background="surface--background--subtle"
          radius="base"
        >
          <Box gap="small" alignItems="center">
            <Icon name="sparkles" size="large" />
            <Heading level={3}>Available on the original site</Heading>
          </Box>
          <Text align="center">
            Triton answers with Jobber's own AI service, which only atlantis.getjobber.com can reach. Ask it there.
          </Text>
          <Button label="Open Atlantis" url={site.atlantisUrl} external />
        </Box>
      </Box>
    </SideDrawer>
  );
}
