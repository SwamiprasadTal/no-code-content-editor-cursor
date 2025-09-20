# ARCHITECTURE.md

## Overview
Aura is a no-code, drag-and-drop visual editor for web layouts, designed for internal teams to create and modify content without engineering support. The architecture is modular, maintainable, and extensible, with a focus on clarity, testability, and future growth.

---

## Design Justification
- **Separation of Concerns:** The UI is split into three main panels (Palette, Canvas, Properties), each with a clear responsibility.
- **Component Modularity:** Each panel and UI element is a separate React component, making the codebase easy to maintain and extend.
- **State Lifting:** All state is managed at the App level, ensuring a single source of truth and easy data flow between panels.
- **Custom Drag-and-Drop:** Built from scratch using native browser events to comply with requirements and provide full control.
- **Real-Time Updates:** Property changes are instantly reflected on the canvas, providing a true WYSIWYG experience.
- **Preview & Export:** The preview mode and HTML export are designed to match the final output, with no editor-specific artifacts.

---

## Architectural Pattern
- **Component-Based Architecture (React):**
  - Each UI panel (Palette, Canvas, Properties) is a separate React component.
  - State is lifted to the App component for easy sharing and future extensibility.
  - The architecture supports adding new component types and features with minimal changes.
- **Why This Pattern?**
  - React’s component model is ideal for building interactive, modular UIs.
  - Lifting state to the App level keeps data flow simple and transparent.
  - This pattern is easy to test, maintain, and extend.

---

## Component Diagram & Communication Flow

```
App
├── PalettePanel
├── CanvasPanel
└── PropertiesPanel
```

- **App:** Root component, manages global state (components, selection, preview mode).
- **PalettePanel:** Lists draggable components. Triggers drag events.
- **CanvasPanel:** Handles drop, move, and selection of components. Notifies App of changes.
- **PropertiesPanel:** Edits properties of the selected component. Updates propagate back to App and then to CanvasPanel.
- **Preview Mode:** App renders a preview of the current layout, with a Back button to return to editing.

**Communication:**
- State and handlers are passed as props from App to child components.
- Child components notify App of changes via callbacks.
- No global state libraries are used, but the structure allows for easy migration if needed.

---

## Technology Justification
- **React + TypeScript:**
  - Chosen for modularity, maintainability, and type safety.
  - React’s component model fits the three-panel layout and interactive UI requirements.
  - TypeScript ensures robust, self-documenting code.
- **Vite:**
  - Provides fast local development, hot module reload, and modern build tooling.
- **Jest + React Testing Library:**
  - Enables robust, maintainable test coverage for all user flows.
- **No drag-and-drop libraries:**
  - All drag/drop logic is custom, per requirements, for full control and compliance.
- **No backend:**
  - All state is managed in-memory (and optionally localStorage), simplifying deployment and setup.

---

## State Management, Component Structure, and Undo/Redo

### State Management
- **Why this approach?**
  - Using React’s `useState` and prop drilling is simple, transparent, and easy to reason about for a single-page app.
  - All state (components, selection, preview mode) is managed in App and passed down as props.
  - This approach is easy to migrate to Context or a state library (like Zustand or Redux) if the app grows.

### Component Structure
- **Why this structure?**
  - Each panel is a separate component, making the codebase modular and maintainable.
  - New features or component types can be added with minimal changes.
  - The structure supports isolated and integration tests.

### Undo/Redo Functionality
- **Current Implementation:**
  - Undo/redo is not implemented for non-I3 users, per requirements.
- **Planned Approach (if needed):**
  - Would use a history stack pattern, storing snapshots of the canvas state and providing undo/redo actions.
  - This can be added by wrapping state updates in a custom hook or context.

---

## Summary
- Aura’s architecture is designed for clarity, maintainability, and extensibility.
- The component-based pattern, custom drag-and-drop, and real-time updates provide a robust foundation for future growth.
- All major design decisions were made to balance user requirements, technical constraints, and long-term maintainability.
