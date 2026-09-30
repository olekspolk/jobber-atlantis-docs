import { Banner } from "@jobber/components/Banner";
import { Box } from "@jobber/components/Box";
import { PropsList } from "../components/PropsList";
import type { PropsEntry } from "../content/types";
import { AtlantisPreviewEditor } from "../preview/AtlantisPreviewEditor";

// A component page's Web or Mobile tab: the example's editor, a note for mobile examples, and the
// props. It loads with the first of those tabs shown, CodeMirror with it.
export function ComponentUsage({
  warningMessage,
  props,
}: {
  warningMessage?: string;
  props: readonly PropsEntry[] | undefined;
}) {
  return (
    <>
      <Box margin={{ bottom: "base" }}>
        <AtlantisPreviewEditor />
      </Box>
      {warningMessage && (
        <Box margin={{ top: "base", bottom: "base" }}>
          <Banner type="warning" dismissible={false}>
            {warningMessage}
          </Banner>
        </Box>
      )}
      <PropsList props={props} />
    </>
  );
}
