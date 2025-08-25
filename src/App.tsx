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

function escapeHTML(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generatePreviewHTML(components: DroppedComponent[]) {
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

// Generate static HTML string for clipboard
function generateHTMLString(components: DroppedComponent[]) {
  function styleToString(style: React.CSSProperties) {
    return Object.entries(style)
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => {
        // Add px to numeric values for relevant CSS properties
        const pxProps = [
          'left', 'top', 'width', 'height', 'fontSize', 'padding', 'borderRadius', 'minWidth', 'minHeight',
        ];
        if (pxProps.includes(k)) {
          if (typeof v === 'number') return `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${v}px`;
        }
        return `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${v}`;
      })
      .join(';');
  }
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Aura Export</title>
</head>
<body style="background:#181a1b;">
<div style="position:relative;width:100%;min-height:600px;background:#181a1b;padding:32px;">
${components.map(comp => {
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
      return `<div style="${styleToString(style)}">${escapeHTML(comp.text || 'Text')}</div>`;
    }
    if (comp.type === 'textarea') {
      return `<div style="${styleToString(style)}">${escapeHTML(comp.text || 'TextArea')}</div>`;
    }
    if (comp.type === 'image') {
      return `<img src="${escapeHTML(comp.imageUrl || 'https://via.placeholder.com/120x120?text=Image')}" alt="${escapeHTML(comp.altText || 'Image')}" style="${styleToString({ ...style, objectFit: comp.objectFit || 'cover' })}" />`;
    }
    if (comp.type === 'button') {
      return `<a href="${escapeHTML(comp.url || '#')}" target="_blank" rel="noopener noreferrer" style="${styleToString(style)}">${escapeHTML(comp.buttonText || 'Button')}</a>`;
    }
    return '';
  }).join('')}
</div>
</body>
</html>`;
}

function App() {
  const [components, setComponents] = useState<DroppedComponent[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyHTML = async () => {
    const html = generateHTMLString(components);
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="aura-app-root">
      <header style={{ background: '#181a1b', color: '#f3f3f3', padding: '16px 32px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #23272f' }}>
        {previewMode ? (
          <>
            <button data-testid="back-button" onClick={() => setPreviewMode(false)} style={{ marginRight: 16, background: 'none', color: '#f3f3f3', border: '1px solid #4fd1c5', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>Back</button>
            <button onClick={handleCopyHTML} style={{ marginRight: 16, background: '#4fd1c5', color: '#181a1b', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer', fontWeight: 600 }}>Copy HTML</button>
            {copied && <span style={{ color: '#4fd1c5', marginRight: 16 }}>Copied!</span>}
          </>
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
