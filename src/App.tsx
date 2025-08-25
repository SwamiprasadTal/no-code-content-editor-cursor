import './App.css'
import PalettePanel from './components/PalettePanel'
import CanvasPanel from './components/CanvasPanel'
import PropertiesPanel from './components/PropertiesPanel'
import React, { useState } from 'react';

interface DroppedComponent {
  id: string;
  type: string;
  x: number;
  y: number;
  text?: string;
  fontSize?: number;
  fontWeight?: '400' | '700';
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  imageUrl?: string;
  altText?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  borderRadius?: number;
  height?: number;
  width?: number;
  url?: string;
  buttonText?: string;
  padding?: number;
  backgroundColor?: string;
  textColor?: string;
}

function generatePreviewHTML(components: DroppedComponent[]) {
  // Render components in DOM order (z-index not handled for MVP)
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 600, background: '#181a1b', padding: 32 }}>
      {components.map((comp) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          left: comp.x,
          top: comp.y,
          borderRadius: comp.borderRadius || undefined,
        };
        if (comp.type === 'text') {
          style.fontSize = comp.fontSize || 16;
          style.fontWeight = comp.fontWeight || '400';
          style.color = comp.color || '#f3f3f3';
        }
        if (comp.type === 'textarea') {
          style.fontSize = comp.fontSize || 16;
          style.color = comp.color || '#f3f3f3';
          style.textAlign = comp.textAlign || 'left';
          style.minWidth = 80;
          style.minHeight = 32;
        }
        if (comp.type === 'image') {
          style.width = comp.width || 120;
          style.height = comp.height || 120;
          style.overflow = 'hidden';
        }
        if (comp.type === 'button') {
          style.fontSize = comp.fontSize || 16;
          style.padding = comp.padding ?? 12;
          style.background = comp.backgroundColor || '#4fd1c5';
          style.color = comp.textColor || '#f3f3f3';
          style.border = 'none';
          style.borderRadius = comp.borderRadius || 4;
          style.textDecoration = 'none';
          style.fontWeight = 500;
          style.display = 'inline-block';
          style.minWidth = 80;
        }
        if (comp.type === 'text') {
          return <div key={comp.id} style={style}>{comp.text || 'Text'}</div>;
        }
        if (comp.type === 'textarea') {
          return <div key={comp.id} style={style}>{comp.text || 'TextArea'}</div>;
        }
        if (comp.type === 'image') {
          return <img key={comp.id} src={comp.imageUrl || 'https://via.placeholder.com/120x120?text=Image'} alt={comp.altText || 'Image'} style={{ ...style, objectFit: comp.objectFit || 'cover' }} />;
        }
        if (comp.type === 'button') {
          return <a key={comp.id} href={comp.url || '#'} target="_blank" rel="noopener noreferrer" style={style}>{comp.buttonText || 'Button'}</a>;
        }
        return null;
      })}
    </div>
  );
}

function App() {
  const [components, setComponents] = useState<DroppedComponent[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div className="aura-app-root">
      <header style={{ background: '#181a1b', color: '#f3f3f3', padding: '16px 32px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #23272f' }}>
        {previewMode ? (
          <button onClick={() => setPreviewMode(false)} style={{ marginRight: 16, background: 'none', color: '#f3f3f3', border: '1px solid #4fd1c5', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>Back</button>
        ) : (
          <button onClick={() => setPreviewMode(true)} style={{ marginRight: 16, background: '#4fd1c5', color: '#181a1b', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer', fontWeight: 600 }}>Preview</button>
        )}
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Aura Editor</h1>
      </header>
      {previewMode ? (
        <div style={{ width: '100vw', minHeight: '100vh', background: '#181a1b' }}>
          {generatePreviewHTML(components)}
        </div>
      ) : (
        <div className="aura-root">
          <div className="aura-panel aura-palette"><PalettePanel /></div>
          <div className="aura-panel aura-canvas">
            <CanvasPanel
              components={components}
              setComponents={setComponents}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </div>
          <div className="aura-panel aura-properties">
            <PropertiesPanel
              selectedId={selectedId}
              components={components}
              setComponents={setComponents}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
