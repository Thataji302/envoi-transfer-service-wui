import { useState, useRef } from "react";
import { CloudUpload, PlaneTakeoff } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function FileUpload() {
  const [sendMethod, setSendMethod] = useState("email");
  const [emails, setEmails] = useState("");
  const [packageOption, setPackageOption] = useState("");
  const [destination, setDestination] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (fileData) => {
      return apiRequest("POST", "/api/files", fileData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["/api/files"]);
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    },
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    files.forEach(file => {
      const fileData = {
        userId: "demo-user-id",
        title: file.name.split('.')[0],
        filename: file.name,
        size: file.size,
        type: file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN',
        thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
        isPublic: false,
      };
      
      uploadMutation.mutate(fileData);
    });
  };

  const handleSend = () => {
    if (!emails.trim() && sendMethod === "email") {
      toast({
        title: "Error",
        description: "Please enter recipient emails",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Files sent successfully",
    });
  };

  return (
    <div className="h-full p-6">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold" data-testid="upload-title">Upload Files</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              data-testid="button-add-files"
            >
              Add Files
            </button>
            <button 
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors border border-border"
              data-testid="button-add-folders"
            >
              Add Folders
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          data-testid="file-input"
        />

        <div 
          className={`upload-zone flex-1 rounded-lg flex flex-col items-center justify-center p-12 mb-6 cursor-pointer ${
            isDragOver ? "drag-over" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          data-testid="upload-zone"
        >
          <div className="text-center">
            <CloudUpload className="text-6xl text-muted-foreground mb-6 w-16 h-16 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Drag and Drop here</h3>
            <p className="text-muted-foreground mb-4">Accepts all file formats and preserves folder structures</p>
            <div className="text-sm text-muted-foreground">Maximum of 30 recipients</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Send Options</h4>
            <div className="space-y-3">
              <label className="flex items-center" data-testid="send-method-email">
                <input 
                  type="radio" 
                  name="sendMethod" 
                  value="email"
                  checked={sendMethod === "email"}
                  onChange={(e) => setSendMethod(e.target.value)}
                  className="mr-3 text-primary"
                />
                <span>Send link via email</span>
              </label>
              <label className="flex items-center" data-testid="send-method-link">
                <input 
                  type="radio" 
                  name="sendMethod" 
                  value="link"
                  checked={sendMethod === "link"}
                  onChange={(e) => setSendMethod(e.target.value)}
                  className="mr-3 text-primary"
                />
                <span>Generate Shareable link</span>
              </label>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Members</label>
              <textarea 
                placeholder="Enter Emails" 
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                className="w-full bg-input border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground resize-none"
                rows="4"
                data-testid="textarea-emails"
              />
            </div>
          </div>

          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Package Options</label>
                <select 
                  value={packageOption}
                  onChange={(e) => setPackageOption(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg p-3 text-foreground"
                  data-testid="select-package"
                >
                  <option value="">Select...</option>
                  <option value="zip">ZIP Archive</option>
                  <option value="individual">Individual Files</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Destinations</label>
                <select 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg p-3 text-foreground"
                  data-testid="select-destination"
                >
                  <option value="">Select...</option>
                  <option value="cloud">Cloud Storage</option>
                  <option value="direct">Direct Download</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleSend}
              disabled={uploadMutation.isPending}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-6 disabled:opacity-50"
              data-testid="button-send"
            >
              <PlaneTakeoff className="mr-2 w-4 h-4 inline" />
              {uploadMutation.isPending ? "SENDING..." : "SEND"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
