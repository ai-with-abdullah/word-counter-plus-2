# Overview

Word Counter Plus is a modern, responsive word counter and text analysis tool built as a full-stack React/Express application. The project provides real-time text analysis capabilities including word count, character count, readability scoring, and keyword density analysis. It features a clean, dashboard-like interface with dark mode support and is designed to be SEO-friendly and AdSense-ready for commercial use.

## Current Implementation

The application is fully configured and running in the Replit environment:
- **Development Server**: Running on port 5000 with hot reload support
- **Frontend**: React 18 with TypeScript, Vite build system
- **Backend**: Express.js server with Vite integration for development
- **Deployment**: Configured for autoscale deployment with build optimization

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side is built using **React 18** with **TypeScript** and follows a component-based architecture:

- **Routing**: Uses `wouter` for lightweight client-side routing with pages for Home, FAQ, Privacy, Terms, and Contact
- **State Management**: Utilizes React Context for theme management and TanStack Query for server state management
- **UI Framework**: Implements Radix UI primitives with shadcn/ui components for a consistent design system
- **Styling**: TailwindCSS with CSS custom properties for theme variables, supporting both light and dark modes
- **Text Analysis**: Custom hooks (`useTextAnalysis`) provide real-time text processing with calculations for readability scores, keyword density, and basic statistics

## Backend Architecture

The server-side follows an **Express.js** architecture with TypeScript:

- **Server Framework**: Express.js with middleware for JSON parsing, logging, and error handling
- **Database Layer**: Uses Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Storage Interface**: Implements an abstraction layer (`IStorage`) with both in-memory and database implementations
- **Development Setup**: Vite integration for hot module replacement and development server

## Build and Development

- **Build Tool**: Vite for frontend bundling with React plugin and runtime error overlay
- **TypeScript**: Configured with strict mode and path mapping for clean imports
- **Development**: Hot reloading with Vite dev server and tsx for TypeScript execution
- **Production**: ESBuild for server bundling and static asset serving

## Design System

- **Component Library**: shadcn/ui with Radix UI primitives for accessibility
- **Theme System**: CSS custom properties with light/dark mode support
- **Typography**: Poppins font family for consistent branding
- **Icons**: Font Awesome for UI icons and visual elements
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Text Analysis Engine

The core functionality centers around comprehensive text analysis:

- **Real-time Processing**: Calculates metrics as users type without server requests
- **Readability Scoring**: Implements Flesch-Kincaid readability algorithm
- **Keyword Analysis**: Processes single, two-word, and three-word phrase frequencies
- **Export Capabilities**: Supports CSV, TXT, and PDF export formats for analysis results

# External Dependencies

## Database and Storage

- **Neon Database**: PostgreSQL-compatible serverless database using `@neondatabase/serverless`
- **Drizzle ORM**: Type-safe database toolkit with migrations support
- **Session Storage**: Uses `connect-pg-simple` for PostgreSQL-backed session management

## UI and Styling

- **Radix UI**: Comprehensive set of accessible UI primitives for components like dialogs, dropdowns, and form controls
- **TailwindCSS**: Utility-first CSS framework with PostCSS for processing
- **Font Awesome**: Icon library for UI elements and branding
- **Google Fonts**: Poppins font family loaded via CDN

## Development and Build Tools

- **Vite**: Frontend build tool with React plugin and development server
- **Replit Integration**: Development environment plugins for cartographer and runtime error handling
- **ESBuild**: Fast JavaScript bundler for production server builds
- **TypeScript**: Static type checking with strict configuration

## State Management and HTTP

- **TanStack Query**: Server state management and caching for API requests
- **React Hook Form**: Form state management with validation support
- **Wouter**: Lightweight client-side routing library
- **Date-fns**: Date manipulation and formatting utilities

## Text Processing

- **Custom Analysis Engine**: Client-side text processing for real-time analysis
- **Export Libraries**: Custom utilities for generating CSV, TXT, and PDF reports
- **Clipboard API**: Browser integration for copying analysis results

## Production Considerations

- **AdSense Integration**: Prepared structure for Google AdSense implementation
- **SEO Optimization**: Meta tags, semantic HTML, and structured data support
- **Performance**: Client-side processing eliminates server load for text analysis
- **Privacy**: All text processing happens in the browser, ensuring user content privacy