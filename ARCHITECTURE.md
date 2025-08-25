# ARCHITECTURE.md

## Overview
Aura is a no-code, drag-and-drop visual editor for web layouts, designed for internal teams to create and modify content without engineering support. The architecture is modular, maintainable, and extensible.

## Architectural Pattern
- **Component-Based Architecture (React):**
  - Each UI panel (Palette, Canvas, Properties) is a separate React component.
  - State is lifted to the App level for easy sharing and future extensibility.
  - The architecture supports adding new component types and features with minimal changes.

## Component Diagram

```
App
├── PalettePanel
├── CanvasPanel
└── PropertiesPanel
```

- **App:** Root component, manages global state (components, selection, preview mode).
- **PalettePanel:** Lists draggable components.
- **CanvasPanel:** Handles drop, move, and selection of components.
- **PropertiesPanel:** Edits properties of the selected component.

## Technology Justification
- **React + TypeScript:** For modular, type-safe, and maintainable UI development.
- **Vite:** Fast local development and modern build tooling.
- **Jest + React Testing Library:** For robust, maintainable test coverage.
- **No drag-and-drop libraries:** All drag/drop logic is custom, per requirements.
- **No backend:** All state is managed in-memory (and optionally localStorage).

## State Management & Undo/Redo
- **State Management:**
  - State is managed in the App component using React's `useState` and passed down as props.
  - This approach is simple, transparent, and easy to extend to Context or a state library if needed.
- **Undo/Redo:**
  - (For I3+ only) Would use a history stack pattern, storing snapshots of the canvas state and providing undo/redo actions.

## Why This Design?
- **Maintainability:** Each feature is encapsulated in its own component.
- **Extensibility:** New component types or features can be added with minimal changes.
- **Testability:** The structure supports isolated and integration tests.
- **Performance:** React and Vite provide fast updates and builds.
