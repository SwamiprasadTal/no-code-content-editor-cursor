import React from 'react';

const COMPONENTS = [
  { type: 'text', label: 'Text' },
  { type: 'textarea', label: 'TextArea' },
  { type: 'image', label: 'Image' },
  { type: 'button', label: 'Button' },
];

const PalettePanel = () => {
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('component-type', type);
    // Optionally, set drag image or other data
  };

  return (
    <div>
      <h2>Component Palette</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {COMPONENTS.map((comp) => (
          <div
            key={comp.type}
            draggable
            onDragStart={(e) => handleDragStart(e, comp.type)}
            style={{
              padding: '12px 16px',
              background: '#23272f',
              border: '1px solid #333',
              borderRadius: 8,
              cursor: 'grab',
              color: '#f3f3f3',
              fontWeight: 500,
              marginBottom: 4,
              userSelect: 'none',
            }}
          >
            {comp.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PalettePanel;
