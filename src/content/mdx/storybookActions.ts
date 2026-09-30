// Storybook's `action` for the live examples that log their events. Outside Storybook the site's
// action handlers report to a channel nobody listens to, so here they do nothing.
export const action =
  (_name: string) =>
  (..._args: unknown[]) => {};
