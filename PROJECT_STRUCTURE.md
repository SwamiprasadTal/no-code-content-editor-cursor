# Project Structure: Aura

```
/ (root)
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # Reusable React components (PalettePanel, CanvasPanel, PropertiesPanel, etc.)
│   ├── hooks/             # Custom React hooks (future use)
│   ├── state/             # State management logic (future use)
│   ├── utils/             # Utility functions (HTML export, clipboard, etc.)
│   ├── styles/            # Global and component styles (App.css, etc.)
│   ├── __tests__/         # Test files for components and app flows
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── package.json           # Project metadata and scripts
├── README.md              # Project overview and setup
├── PROJECT_STRUCTURE.md   # This file
├── ARCHITECTURE.md        # Architecture and design decisions
├── CHAT_HISTORY.md        # AI design journey summary
```

- **components/**: All UI building blocks (Palette, Canvas, PropertiesPanel, etc.)
- **hooks/**: Custom hooks for drag-and-drop, selection, undo/redo, etc. (future)
- **state/**: Centralized state management (context, reducers, or store) (future)
- **utils/**: Helper functions (HTML export, clipboard, etc.)
- **styles/**: Theming and dark mode styles
- **__tests__/**: Automated test cases for the app
