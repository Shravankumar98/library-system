import { theme } from "antd";

// Brand Colors:
// #005461 - Dark Teal (Darkest, used for hover/active states)
// #018790 - Teal (Primary, main action color)
// #00B7B5 - Bright Teal (Secondary, accents and highlights)
// #F4F4F4 - Light Gray (Background)

const appTheme = {
  token: {
    colorPrimary: "#018790",
    colorSuccess: "#00B7B5",
    colorWarning: "#FAAD14",
    colorError: "#F5222D",
    colorInfo: "#005461",
    colorTextBase: "#000000",
    colorBgBase: "#F4F4F4",
    colorBorder: "#00B7B5",
    colorBgContainer: "#FFFFFF",
    colorBgElevated: "#F4F4F4",
    colorBgLayout: "#F4F4F4",
    borderRadius: 6,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
  },
  algorithm: theme.defaultAlgorithm,
};

export default appTheme;
