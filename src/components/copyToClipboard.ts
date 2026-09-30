import { showToast } from "@jobber/components/Toast";

// Copies text and says so in a toast, or says it could not: no permission, a page without focus, or
// no clipboard at all (a page served over plain http).
export async function copyToClipboard(text: string, copied: string, failed: string) {
  try {
    await navigator.clipboard.writeText(text);
    showToast({ message: copied });
  } catch {
    showToast({ message: failed });
  }
}
