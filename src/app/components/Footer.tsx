import React from "react";
import ThemeToggle from "./ThemeToggle";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-row w-full items-center p-3">
      <div className="flex flex-1"></div>
      <div className="flex flex-1 flex-row justify-end">
        <ThemeToggle />
      </div>
    </footer>
  );
};

export default Footer;
