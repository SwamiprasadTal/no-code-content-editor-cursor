# PROJECT_STRUCTURE.md

This document explains the structure of the Aura project and the purpose of each folder and key module.

```
/ (root)
├── public/                # Static assets (favicon, images, etc.)
├── src/                   # Source code
│   ├── components/        # Reusable React components (UI panels, controls, etc.)
│   │   ├── PalettePanel.tsx      # The left panel: component palette
│   │   ├── CanvasPanel.tsx       # The center panel: drag-and-drop canvas
│   │   ├── PropertiesPanel.tsx   # The right panel: properties editor
│   │   └── ...                   # Other UI components as needed
│   ├── hooks/             # Custom React hooks (for drag-and-drop, selection, etc.)
│   ├── state/             # State management logic (context, reducers, or store if needed)
│   ├── utils/             # Utility functions (HTML export, clipboard, etc.)
│   ├── styles/            # Global and component styles (App.css, etc.)
│   ├── __tests__/         # Test files for components and app flows
│   ├── App.tsx            # Main app component (root of UI and state)
│   └── main.tsx           # Entry point for React app
├── package.json           # Project metadata and scripts
├── README.md              # Project overview and setup
├── PROJECT_STRUCTURE.md   # This file
├── ARCHITECTURE.md        # Architecture and design decisions
├── CHAT_HISTORY.md        # AI design journey summary
```

## Folder & File Purposes

- **public/**: Contains static files served directly (e.g., favicon, images). Not processed by Vite.
- **src/**: All application source code.
  - **components/**: All UI building blocks. Each panel (Palette, Canvas, Properties) is a separate component. Other reusable UI elements can be added here.
  - **hooks/**: Custom React hooks for encapsulating logic (e.g., drag-and-drop, selection, undo/redo). (Future expansion)
  - **state/**: Centralized state management (e.g., React context, reducers, or Zustand store). (Future expansion)
  - **utils/**: Helper functions for tasks like HTML export, clipboard operations, etc.
  - **styles/**: CSS or SCSS files for global and component-specific styles. Ensures consistent dark theme and layout.
  - **__tests__/**: Automated test cases for the app, using React Testing Library and Jest.
  - **App.tsx**: The main application component. Manages global state, layout, and panel communication.
  - **main.tsx**: The entry point that renders the App component into the DOM.
- **package.json**: Project metadata, dependencies, and scripts for building, running, and testing.
- **README.md**: Project overview, setup instructions, and documentation links.
- **PROJECT_STRUCTURE.md**: This document, explaining the folder and module structure.
- **ARCHITECTURE.md**: Detailed architecture, design rationale, diagrams, and technology choices.
- **CHAT_HISTORY.md**: Summary of the design journey and key AI-assisted decisions.
