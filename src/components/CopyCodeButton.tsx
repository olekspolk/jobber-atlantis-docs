import { Button } from "@jobber/components/Button";
import { showToast } from "@jobber/components/Toast";

export const CopyCodeButton = ({ code }: { code: string }) => (
  <div style={{ position: "absolute", bottom: 10, right: 3 }}>
    <Button
      icon="copy"
      ariaLabel="Copy"
      type="secondary"
      variation="subtle"
      size="small"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          showToast({ message: "Copied code to clipboard" });
        } catch {
          showToast({ message: "Unable to copy code" });
        }
      }}
    />
  </div>
);
