import * as Babel from "@babel/standalone";
import { getPreCode } from "./exampleCode";
import type { TranspileRequest, TranspileResult } from "./transpile";

// An example in, the `function App(props){...}` the preview frame runs out, one request at a time.
self.onmessage = ({ data }: MessageEvent<TranspileRequest>) => {
  let result: TranspileResult;
  try {
    const code =
      Babel.transform(`function App(props){${getPreCode(data.source)}}`, {
        presets: [["env", { modules: false }], "react"],
        plugins: [["transform-typescript", { isTSX: true, allExtensions: false }]],
      }).code ?? "";
    result = { id: data.id, code };
  } catch (error) {
    result = { id: data.id, error: (error as Error).message };
  }
  self.postMessage(result);
};
