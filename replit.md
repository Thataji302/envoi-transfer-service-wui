# Overview

This is a file sharing and storage application called PacSend, built with a modern full-stack architecture. The application allows users to upload, manage, and share files with features like storage quota tracking, file thumbnails, and public/private file sharing options. It's designed as a cloud storage solution similar to services like Dropbox or Google Drive.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript and Vite for fast development builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with a dark theme design system using CSS custom properties
- **State Management**: TanStack React Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Component Structure**: Modular component architecture with reusable UI components in `/components/ui/`

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with endpoints for file operations (upload, list, delete) and user management
- **File Storage**: In-memory storage implementation with demo data (designed to be replaced with actual file storage)
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Development Setup**: Hot reload with tsx and Vite integration for seamless development

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Shared schema definitions between client and server using Drizzle with Zod validation
- **Migrations**: Drizzle Kit for database schema migrations
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment
- **Demo Data**: In-memory storage implementation for development with pre-populated demo files

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User System**: Basic user management with username/password authentication
- **Authorization**: User-based file access control with public/private file sharing options
- **Demo Mode**: Hardcoded demo user for development and testing

## Data Models
- **Users**: User accounts with storage quotas, plans (free/premium), and usage tracking
- **Files**: File metadata including titles, sizes, types, thumbnails, upload dates, and privacy settings
- **Storage Tracking**: Real-time storage usage calculation and quota enforcement

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production database
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect support

## UI and Design System
- **Radix UI**: Headless UI components for accessibility and customization
- **Shadcn/ui**: Pre-built component library based on Radix UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form handling with performance optimization
- **Zod**: Runtime type validation and schema definition

## Deployment and Development
- **Replit**: Development platform integration with specialized plugins
- **PostCSS**: CSS processing with Tailwind CSS integration
- **Date-fns**: Date manipulation and formatting utilities