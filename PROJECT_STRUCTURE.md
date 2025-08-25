# Project Structure: Aura

```
/ (root)
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # Reusable React components
│   ├── hooks/             # Custom React hooks
│   ├── state/             # State management logic
│   ├── utils/             # Utility functions
│   ├── styles/            # Global and component styles
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── package.json           # Project metadata and scripts
├── README.md              # Project overview and setup
├── PROJECT_STRUCTURE.md   # This file
├── ARCHITECTURE.md        # Architecture and design decisions
├── CHAT_HISTORY.md        # AI design journey summary
```

- **components/**: All UI building blocks (Palette, Canvas, PropertiesPanel, etc.)
- **hooks/**: Custom hooks for drag-and-drop, selection, undo/redo, etc.
- **state/**: Centralized state management (context, reducers, or store)
- **utils/**: Helper functions (HTML export, clipboard, etc.)
- **styles/**: Theming and dark mode styles
