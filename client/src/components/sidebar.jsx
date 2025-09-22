import { PlaneTakeoff, Inbox, Send, Folder, MapPin, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Sidebar({ activeTab, onTabChange }) {
  const { data: user } = useQuery({
    queryKey: ["/api/user"],
  });

  const menuItems = [
    { id: "upload", icon: Inbox, label: "Inbox" },
    { id: "content-grid", icon: Send, label: "Outbox" },
    { id: "content-grid", icon: Folder, label: "Content" },
    { id: "file-list", icon: MapPin, label: "Destinations" },
    { id: "activity", icon: TrendingUp, label: "Activity" }
  ];

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const storagePercentage = user ? ((user.storageUsed / user.storageLimit) * 100).toFixed(1) : 0;

  return (
    <div className="w-60 bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <PlaneTakeoff className="text-primary text-xl mr-2" />
          <span className="text-xl font-bold">PacSend</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`sidebar-item flex items-center px-3 py-2 rounded-lg w-full text-left transition-colors ${
                activeTab === item.id 
                  ? "text-foreground bg-secondary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`sidebar-${item.id}`}
            >
              <item.icon className="mr-3 w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6">
        <div className="bg-secondary rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Storage</span>
            <span className="text-sm text-primary font-semibold" data-testid="storage-percentage">
              {storagePercentage}%
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2 mb-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${storagePercentage}%` }}
              data-testid="storage-progress"
            />
          </div>
          <div className="text-xs text-muted-foreground mb-3" data-testid="storage-usage">
            {user ? formatBytes(user.storageUsed) : '0 Bytes'} of {user ? formatBytes(user.storageLimit) : '100 GB'} used
          </div>
          <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors" data-testid="button-upgrade">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
