import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";
import ActionBar from "./ActionBar";

export default function Layout() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [onClearSelection, setOnClearSelection] = useState<(() => void) | null>(null);
  const [onDelete, setOnDelete] = useState<(() => void) | null>(null);

  const location = useLocation();
  const activeTab = location.pathname.includes('task') ? 'task' : 'user';

  const handleClearSelection = () => {
    if (onClearSelection) {
      onClearSelection();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={() => {}} />
        <main className="flex flex-1 flex-col overflow-hidden">
          {selectedCount > 0 && (
            <ActionBar
              selectedCount={selectedCount}
              onClearSelection={handleClearSelection}
              onDelete={handleDelete}
            />
          )}
          <div className="flex-1 overflow-auto p-">
            <Outlet context={{ setSelectedCount, setOnClearSelection, setOnDelete }} />
          </div>
        </main>
      </div>
    </div>
  );
}