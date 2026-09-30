import site from "../../site.config.json";

// Storybook is hosted by the original site only, so its links point there.
const storybookHosts = {
  web: `${site.atlantisUrl}/storybook/web`,
  mobile: `${site.atlantisUrl}/storybook/mobile`,
} as const;

export const getStorybookUrl = (path: string, type: keyof typeof storybookHosts) => `${storybookHosts[type]}/${path}`;
