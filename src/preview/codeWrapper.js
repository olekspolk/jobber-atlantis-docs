import { AtlantisThemeContextProvider, Button, FilterPicker, React, ReactDOM, useState } from "@jobber/components";

{{app}}

function RootWrapper() {
  return React.createElement(AtlantisThemeContextProvider, null, React.createElement(App));
}

if (!rootElement) {
  rootElement = document.getElementById("root");
  root = ReactDOM.createRoot(rootElement);
}
root.render(React.createElement(RootWrapper, null));
