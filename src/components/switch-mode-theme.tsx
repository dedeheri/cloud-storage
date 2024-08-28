"use client";

import React from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import { IconMoon } from "@tabler/icons-react";

const SwitchModeTheme = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const [switchTheme, setSwitchTheme] = React.useState<boolean>(false);

  const onChangeTheme = () => {
    if (resolvedTheme === "ligth") {
      setSwitchTheme(true);
      setTheme("dark");
    } else {
      setSwitchTheme(false);
      setTheme("ligth");
    }
  };

  React.useEffect(() => {
    resolvedTheme === "ligth" ? setSwitchTheme(false) : setSwitchTheme(true);
  }, [resolvedTheme]);

  return (
    <div className="flex items-center justify-between space-x-2 px-4 py-3">
      <Label
        htmlFor="theme-mode"
        className="flex items-center cursor-pointer group w-full space-x-2"
      >
        <IconMoon className="w-6 h-6 group-hover:text-gray-600 dark:group-hover:text-gray-300 duration-300" />

        <span className="group-hover:text-gray-600 dark:group-hover:text-gray-300 duration-300">
          Theme
        </span>
      </Label>
      <Switch onClick={onChangeTheme} checked={switchTheme} id="theme-mode" />
    </div>
  );
};

export default SwitchModeTheme;
