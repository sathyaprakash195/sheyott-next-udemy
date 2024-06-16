import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  // use token if u want to update any property in global level
  // use components if u want to update any property in component level
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000",
          borderRadius: 2,
        },
        components: {
          Button: {
            controlHeight: 42,
            controlOutline: "none",
            colorPrimaryBorder: "#000",
            colorBorder: "#000",
          },
          Input: {
            controlHeight: 42,
            controlOutline: "none",
          },
          Select: {
            controlHeight: 42,
            controlOutline: "none",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;
