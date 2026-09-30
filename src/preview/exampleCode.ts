import { parser } from "@lezer/javascript";

/** Parser for example code, shared by the editor and the transpiler. */
export const exampleParser = parser.configure({ dialect: "jsx ts" });

const NESTED_BODIES = new Set(["FunctionDeclaration", "ClassDeclaration"]);

/**
 * Example code may be a bare expression or a component body with its own `return`: one at statement
 * level, not inside an expression or a declared function (a callback's `return` does not count).
 */
export const getPreCode = (codeUp: string) => {
  let hasOwnReturn = false;
  exampleParser.parse(codeUp).iterate({
    enter: (node) => {
      if (hasOwnReturn || node.type.is("Expression") || NESTED_BODIES.has(node.name)) return false;
      if (node.name === "ReturnStatement") hasOwnReturn = true;
    },
  });
  return hasOwnReturn ? codeUp : `return (${codeUp.trim()})`;
};
