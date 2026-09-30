import {
  ActionItem,
  ActionItemGroup,
  ActionLabel,
  ActivityIndicator,
  AtlantisThemeContextProvider,
  AtlantisOverlayProvider,
  AtlantisPortalHost,
  AutoLink,
  Banner,
  BottomSheet,
  BottomSheetOption,
  Button,
  ButtonGroup,
  Card,
  Content,
  Checkbox,
  Chip,
  ContentOverlay,
  Disclosure,
  Divider,
  EmptyState,
  Flex,
  Icon,
  StatusLabel,
  Glimmer,
  Heading,
  IconButton,
  Form,
  FormField,
  FormatFile,
  InputCurrency,
  InputDate,
  InputEmail,
  InputFieldWrapper,
  InputNumber,
  InputPassword,
  InputPressable,
  InputSearch,
  InputText,
  InputTime,
  IntlProvider,
  ProgressBar,
  ProgressIndicator,
  React,
  ReactDOM,
  Select,
  Option,
  Switch,
  Text,
  TextList,
  ThumbnailList,
  Toast,
  showToast,
  Typography,
  useAtlantisTheme,
  useState,
  forwardRef,
  useEffect,
  useRef,
  View,
} from "@jobber/components-native";

{{app}}

function OverlayProviderWrapper() {
  return React.createElement(AtlantisOverlayProvider, null, React.createElement(RootWrapper));
}

function RootWrapper() {
  return React.createElement(
    AtlantisThemeContextProvider,
    null,
    React.createElement(function ThemeHandler() {
      const { setTheme } = useAtlantisTheme();

      // The docs page's theme toggle reaches the example through this.
      window.updateMobileTheme = (theme) => setTheme(theme);

      useEffect(() => {
        setTheme(document.documentElement.dataset.theme);
      }, []);

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          View,
          { style: { display: "flex", alignItems: "center", justifyContent: "center", width: "100%" } },
          React.createElement(App),
        ),
        React.createElement(AtlantisPortalHost),
      );
    }),
  );
}

function IntlWrapper() {
  return React.createElement(IntlProvider, { locale: "en" }, React.createElement(OverlayProviderWrapper));
}

if (!rootElement) {
  rootElement = document.getElementById("root");
  root = ReactDOM.createRoot(rootElement);
}
root.render(React.createElement(IntlWrapper, null));
