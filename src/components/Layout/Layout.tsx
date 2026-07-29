import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import ActionBar from "./ActionBar";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Content */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Action Bar */}
          {/* <ActionBar /> */}

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}