/** Replaces each `{{name}}` in a template file with `values.name`; a missing value is an error. */
export const fillTemplate = (template: string, values: Readonly<Record<string, string>>) =>
  template.replace(/{{\s*(\w+)\s*}}/g, (placeholder, key: string) => {
    if (!Object.hasOwn(values, key)) throw new Error(`No value for ${placeholder}`);
    return values[key];
  });
