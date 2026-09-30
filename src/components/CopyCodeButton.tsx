import { Button } from "@jobber/components/Button";
import { Tooltip } from "@jobber/components/Tooltip";
import { copyToClipboard } from "./copyToClipboard";

export const CopyCodeButton = ({ code }: { code: string }) => (
  <div style={{ position: "absolute", bottom: "10px", right: "3px" }}>
    <Tooltip message="Copy code to clipboard">
      <Button
        ariaLabel="Copy"
        icon="copy"
        type="secondary"
        variation="subtle"
        size="small"
        onClick={() => copyToClipboard(code, "Copied code to clipboard", "Unable to copy code")}
      />
    </Tooltip>
  </div>
);
