// Babel turns an example into the code the preview frame runs. It runs in a worker: loaded on the
// page, its 3MB would hold the main thread for a long while on a slow phone. The worker answers in
// the order it is asked.
export interface TranspileRequest {
  readonly id: number;
  readonly source: string;
}

export type TranspileResult =
  | { readonly id: number; readonly code: string; readonly error?: undefined }
  | { readonly id: number; readonly code?: undefined; readonly error: string };

let worker: Worker | null = null;
let nextId = 0;
const waiting = new Map<number, (result: TranspileResult) => void>();

function startWorker() {
  const started = new Worker(new URL("./transpile.worker.ts", import.meta.url), { type: "module" });
  started.onmessage = ({ data }: MessageEvent<TranspileResult>) => {
    waiting.get(data.id)?.(data);
    waiting.delete(data.id);
  };
  // A worker that fails to load answers every request with the error, and the next request starts
  // a new one.
  started.onerror = (event) => {
    event.preventDefault();
    for (const [id, resolve] of waiting) resolve({ id, error: event.message || "The example could not be compiled." });
    waiting.clear();
    worker = null;
  };
  return started;
}

export function transpile(source: string): Promise<TranspileResult> {
  worker ??= startWorker();
  const id = nextId++;
  const request: TranspileRequest = { id, source };
  return new Promise((resolve) => {
    waiting.set(id, resolve);
    worker?.postMessage(request);
  });
}
