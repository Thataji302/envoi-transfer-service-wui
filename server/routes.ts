import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFileSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get user files
  app.get("/api/files", async (req, res) => {
    try {
      // For demo, use the demo user ID
      const files = await storage.getUserFiles("demo-user-id");
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch files" });
    }
  });

  // Upload new file
  app.post("/api/files", async (req, res) => {
    try {
      const validation = insertFileSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid file data" });
      }

      const file = await storage.createFile(validation.data);
      res.json(file);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // Delete file
  app.delete("/api/files/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteFile(id);
      
      if (!success) {
        return res.status(404).json({ message: "File not found" });
      }
      
      res.json({ message: "File deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete file" });
    }
  });

  // Get user info (for storage usage)
  app.get("/api/user", async (req, res) => {
    try {
      // For demo, return the demo user
      const user = await storage.getUser("demo-user-id");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
