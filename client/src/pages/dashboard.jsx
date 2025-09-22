import { useState } from "react";
import Sidebar from "../components/sidebar.jsx";
import FileUpload from "../components/file-upload.jsx";
import ContentGrid from "../components/content-grid.jsx";
import FileList from "../components/file-list.jsx";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("content-grid");

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return <FileUpload />;
      case "content-grid":
        return <ContentGrid onViewChange={setActiveTab} />;
      case "file-list":
        return <FileList onViewChange={setActiveTab} />;
      case "activity":
        return (
          <div className="h-full p-6 flex items-center justify-center">
            <div className="text-muted-foreground">Activity tracking coming soon...</div>
          </div>
        );
      default:
        return <ContentGrid onViewChange={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen pt-16">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-hidden" data-testid="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
}
