# Aura: No-Code Visual Editor

Aura is a dark-themed, no-code visual editor for building web layouts and promotional materials without engineering support. It features a drag-and-drop canvas, dynamic properties panel, real-time updates, and HTML export.

---

## Overview
Aura empowers internal teams to visually create and edit web layouts without writing code. It features a three-panel layout (Palette, Canvas, Properties), real-time property editing, and instant HTML export.

---

## Features
- Drag and drop components (Text, TextArea, Image, Button) onto a freeform canvas
- Move and select components freely
- Dynamic properties panel for selected components
- Real-time updates and preview
- Copy generated HTML to clipboard
- Automated test coverage for all major flows

---

## Getting Started

### Prerequisites
- Node.js v20.11.0 or later (but not requiring the very latest Vite version)
- npm (comes with Node.js)

### Installation
```bash
npm install
```

### Running the App
```bash
npm run dev
```
Visit the local URL (usually http://localhost:5173) to use the editor.

### Running Tests
```bash
npm test
```

---

## Project Structure
See [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) for details.

---

## Design, Architecture, and Component Communication

Aura is architected as a modular, component-based React application. The main components and their communication flow are as follows:

- **App**: Root component, manages global state (components, selection, preview mode) and passes state and handlers down to child components.
- **PalettePanel**: Displays a list of draggable component types. Communicates with the canvas via native drag-and-drop events.
- **CanvasPanel**: The interactive area where users drop, move, and select components. Receives the list of components and selection state from App. Notifies App of changes (e.g., new component dropped, component moved, component selected).
- **PropertiesPanel**: Shows and edits properties for the currently selected component. Receives the selected component and update handler from App. Updates propagate back to App and then to CanvasPanel.
- **Preview Mode**: When activated, App renders a preview of the current layout as it would appear in production, with a “Back” button to return to editing.

**Communication Flow:**
- State is managed in App and passed down as props. Updates flow upward via handler functions.
- PalettePanel triggers native drag events; CanvasPanel handles drop and updates the component list in App.
- Clicking a component on the canvas sets it as selected in App; PropertiesPanel updates its properties, which are reflected in real time on the canvas.

---

## Journey from Brainstorming to Implementation

1. **Initial Brainstorming**: Clarified requirements—no-code, drag-and-drop, no external drag libraries, three-panel layout, real-time property editing, preview, and HTML export.
2. **Architecture Planning**: Decided on a React + TypeScript stack for maintainability and extensibility. Chose a three-panel layout for clear separation of concerns.
3. **Component Design**: Broke down the UI into PalettePanel, CanvasPanel, and PropertiesPanel, with App as the state manager.
4. **Drag-and-Drop Implementation**: Built custom drag-and-drop logic using native browser events, as required.
5. **Properties & Real-Time Updates**: Implemented dynamic property panels and two-way binding for instant updates.
6. **Preview & Export**: Added a preview mode and robust HTML export with correct style serialization.
7. **Testing**: Created a comprehensive test suite using React Testing Library and Jest, iteratively fixing issues for robust coverage.
8. **Documentation**: Wrote detailed docs and architecture diagrams, and summarized the AI-assisted design journey.

---

## Key Decisions and Trade-offs

- **Custom Drag-and-Drop**: Implemented from scratch (no libraries) to meet requirements, trading off some development speed for full control and compliance.
- **State Management**: Used React’s `useState` and prop drilling for simplicity and transparency, with the option to migrate to Context or a state library if the app grows.
- **Component Modularity**: Designed each panel as a separate component for maintainability and future extensibility.
- **Testing Approach**: Used data-testid and async queries for robust, jsdom-compatible tests, trading off some test realism for reliability in CI.
- **No Backend**: All state is in-memory (and optionally localStorage), simplifying deployment and setup.

---

## Demo of the Entire Application

1. **Palette Panel**: Drag any component type (Text, TextArea, Image, Button) from the left panel.
2. **Canvas Panel**: Drop components onto the canvas, move them freely, and select them by clicking.
3. **Properties Panel**: Edit properties (text, color, size, image URL, button link, etc.) for the selected component. Changes are reflected instantly on the canvas.
4. **Preview Mode**: Click “Preview” in the header to see the final HTML layout. Use “Copy HTML” to export the code, and “Back” to return to editing.
5. **Testing**: All major user flows are covered by automated tests.

---

## Test Case Coverage %

- **Automated Test Coverage:** 100% of the main user flows are covered:
  - Rendering of all panels and controls
  - Palette component listing
  - Adding components to the canvas
  - Selecting and editing component properties
  - Preview mode and HTML export
  - Copy-to-clipboard functionality
- **Test Suite:** 6 comprehensive tests, all passing, covering both UI and logic.

---

For more details, see [`ARCHITECTURE.md`](./ARCHITECTURE.md) and [`CHAT_HISTORY.md`](./CHAT_HISTORY.md).
