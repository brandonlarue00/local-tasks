"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify-icon/react";

const ThemeToggle: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex flex-row items-center space-x-1">
      <Icon icon="ph-sun-light" style={{ fontSize: "24px" }} />
      <label htmlFor="theme-toggle" className="relative inline-block w-14 h-8">
        <input
          id="theme-toggle"
          type="checkbox"
          className="opacity-0 w-0 h-0"
          onChange={handleThemeChange}
          checked={theme === "dark"}
        />
        <span className="slider round absolute top-0 left-0 right-0 bottom-0 bg-purple-500 dark:bg-white rounded-full"></span>
        <span
          className={`circle absolute top-1 left-1 w-6 h-6 bg-white dark:bg-purple-500 rounded-full transform transition-all ${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
          }`}
        ></span>
      </label>
      <Icon icon="ph-moon-light" style={{ fontSize: "24px" }} />
    </div>
  );
};
export default ThemeToggle;
