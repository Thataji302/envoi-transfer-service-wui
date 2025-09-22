import { type User, type InsertUser, type File, type InsertFile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserFiles(userId: string): Promise<File[]>;
  createFile(file: InsertFile): Promise<File>;
  deleteFile(id: string): Promise<boolean>;
  getFile(id: string): Promise<File | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private files: Map<string, File>;

  constructor() {
    this.users = new Map();
    this.files = new Map();
    
    // Create demo user for development
    const demoUser: User = {
      id: "demo-user-id",
      username: "demo",
      password: "demo123",
      email: "demo@pacsend.com",
      plan: "free",
      storageUsed: 536870912, // 512MB
      storageLimit: 107374182400, // 100GB
    };
    this.users.set(demoUser.id, demoUser);

    // Create demo files
    const demoFiles: File[] = [
      {
        id: "file-1",
        userId: "demo-user-id",
        title: "videoclip_2023",
        filename: "videoclip_2023.mp4",
        size: 209715200, // 200MB
        type: "MP4",
        thumbnailUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        uploadDate: new Date("2026-03-09T11:09:00Z"),
        isPublic: false,
      },
      {
        id: "file-2",
        userId: "demo-user-id",
        title: "videoclip3_2023",
        filename: "videoclip3_2023.mp4",
        size: 157286400, // 150MB
        type: "MP4",
        thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        uploadDate: new Date("2026-03-09T11:09:00Z"),
        isPublic: false,
      },
      {
        id: "file-3",
        userId: "demo-user-id",
        title: "videoclip4_2023",
        filename: "videoclip4_2023.mp4",
        size: 209715200, // 200MB
        type: "MP4",
        thumbnailUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        uploadDate: new Date("2026-03-09T11:09:00Z"),
        isPublic: false,
      },
      {
        id: "file-4",
        userId: "demo-user-id",
        title: "videoclip5_2023",
        filename: "videoclip5_2023.mp4",
        size: 157286400, // 150MB
        type: "MP4",
        thumbnailUrl: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        uploadDate: new Date("2026-03-09T11:09:00Z"),
        isPublic: false,
      },
      {
        id: "file-5",
        userId: "demo-user-id",
        title: "videoclip6_2023",
        filename: "videoclip6_2023.mp4",
        size: 209715200, // 200MB
        type: "MP4",
        thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=225",
        uploadDate: new Date("2026-03-09T11:09:00Z"),
        isPublic: false,
      },
    ];
    
    demoFiles.forEach(file => this.files.set(file.id, file));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      plan: insertUser.plan || "free",
      storageUsed: 0,
      storageLimit: insertUser.plan === "free" ? 107374182400 : 1099511627776, // 100GB or 1TB
    };
    this.users.set(id, user);
    return user;
  }

  async getUserFiles(userId: string): Promise<File[]> {
    return Array.from(this.files.values()).filter(file => file.userId === userId);
  }

  async createFile(insertFile: InsertFile): Promise<File> {
    const id = randomUUID();
    const file: File = {
      ...insertFile,
      id,
      thumbnailUrl: insertFile.thumbnailUrl || null,
      isPublic: insertFile.isPublic || false,
      uploadDate: new Date(),
    };
    this.files.set(id, file);
    return file;
  }

  async deleteFile(id: string): Promise<boolean> {
    return this.files.delete(id);
  }

  async getFile(id: string): Promise<File | undefined> {
    return this.files.get(id);
  }
}

export const storage = new MemStorage();
