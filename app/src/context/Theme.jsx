import { ConfigProvider } from "antd";
import { createContext, useEffect, useState } from "react";

const lightTheme = {
  token: {
    borderRadius: 2,

    colorBgBase: "#fff",
    colorBgContainer: "#fff",
    colorBgLayout: "#f5f5f5",
    colorBgElevated: "#fff",

    colorTextBase: "#000",
    colorText: "rgba(0, 0, 0, 0.88)",
    colorTextQuaternary: "rgba(0, 0, 0, 0.25)",
    colorTextSecondary: "rgba(0, 0, 0, 0.65)",
    colorTextTertiary: "rgba(0, 0, 0, 0.45)",

    colorErrorText: "#ff4d4f",
    colorErrorTextActive: "#d9363e",
    colorErrorTextHover: "#ff7875",

    colorWarningText: "#faad14",
    colorWarningTextActive: "#d48806",
    colorWarningTextHover: "#ffc53d",

    colorInfoText: "#1677ff",
    colorInfoTextActive: "#0958d9",
    colorInfoTextHover: "#4096ff",

    colorPrimaryText: "#1677ff",
    colorPrimaryTextActive: "#0958d9",
    colorPrimaryTextHover: "#4096ff",

    colorSuccessText: "#52c41a",
    colorSuccessTextActive: "#389e0d",
    colorSuccessTextHover: "#52c41a",

    colorError: "#ff4d4f",
    colorInfo: "#1677ff",
    colorLink: "#1677ff",
    colorPrimary: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",

    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",

    colorBgMask: "rgba(0, 0, 0, 0.45)",
    colorBgSpotlight: "rgba(0, 0, 0, 0.85)",
    colorBorder: "#d9d9d9",
    colorBorderSecondary: "#f0f0f0",
    colorErrorActive: "#d9363e",
    colorErrorBg: "#fff2f0",
    colorErrorBgHover: "#fff1f0",
    colorErrorBorder: "#ffccc7",
    colorErrorBorderHover: "#ffa39e",
    colorErrorHover: "#ff7875",
    colorFill: "rgba(0, 0, 0, 0.15)",
    colorFillQuaternary: "rgba(0, 0, 0, 0.02)",
    colorFillSecondary: "rgba(0, 0, 0, 0.06)",
    colorFillTertiary: "rgba(0, 0, 0, 0.04)",
    colorInfoActive: "#0958d9",
    colorInfoBg: "#e6f4ff",
    colorInfoBgHover: "#bae0ff",
    colorInfoBorder: "#91caff",
    colorInfoBorderHover: "#69c1ff",
    colorInfoHover: "#69b1ff",
    colorLinkActive: "#0958d9",
    colorLinkHover: "#69b1ff",
    colorPrimaryActive: "#0958d9",
    colorPrimaryBg: "#e6f4ff",
    colorPrimaryBgHover: "#bae0ff",
    colorPrimaryBorder: "#91caff",
    colorPrimaryBorderHover: "#69b1ff",
    colorPrimaryHover: "#4096ff",
    colorSuccessActive: "#389e0d",
    colorSuccessBg: "#f6ffed",
    colorSuccessBgHover: "#d9f7be",
    colorSuccessBorder: "#b7eb8f",
    colorSuccessBorderHover: "#7bcf39",
    colorSuccessHover: "#52c41a",
    colorWarningActive: "#d48806",
    colorWarningBg: "#fffbe6",
    colorWarningBgHover: "#fff1b8",
    colorWarningBorder: "#ffe58f",
    colorWarningBorderHover: "#ffd666",
    colorWarningHover: "#ffd666",
    colorWhite: "#fff",
  },
};
const darkTheme = {
  token: {
    colorPrimary: "#00b96b",

    colorBgBase: "#101010",
    colorBgContainer: "#121212",
    colorBgLayout: "#1919119",
    colorBgElevated: "#161616",

    colorTextBase: "#fff",
    colorText: "rgba(255, 255, 255, 0.88)",
    colorTextQuaternary: "rgba(255, 255, 255, 0.6)",
    colorTextSecondary: "rgba(255, 255, 255, 0.8)",
    colorTextTertiary: "rgba(255, 255, 255, 0.75)",
  },
};

export const ThemeContext = createContext({
  thisTheme: lightTheme,
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  useEffect(() => {
    // get theme from local storage
    var theme = localStorage.getItem("theme");
    // theme exists in local storage
    if (!theme) {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? darkTheme
        : lightTheme;
    }
    console.log(theme);
    setTheme(JSON.parse(theme) === "light" ? lightTheme : darkTheme);
  }, []);

  const setTheme = (nameTheme) => {
    if (nameTheme === "light") {
      localStorage.setItem("theme", JSON.stringify("light"));
      setThisTheme(lightTheme);
    } else {
      localStorage.setItem("theme", JSON.stringify("dark"));
      setThisTheme(darkTheme);
    }
  };

  const [thisTheme, setThisTheme] = useState(lightTheme);

  return (
    <ThemeContext.Provider value={{ thisTheme, setTheme }}>
      <ConfigProvider
        theme={{
          token: thisTheme.token,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
