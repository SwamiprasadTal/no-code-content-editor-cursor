import React from 'react';

interface DroppedComponent {
  id: string;
  type: string;
  x: number;
  y: number;
  // Text/TextArea
  text?: string;
  fontSize?: number;
  fontWeight?: '400' | '700';
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  // Image
  imageUrl?: string;
  altText?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  borderRadius?: number;
  height?: number;
  width?: number;
  // Button
  url?: string;
  buttonText?: string;
  padding?: number;
  backgroundColor?: string;
  textColor?: string;
}

interface PropertiesPanelProps {
  selectedId: string | null;
  components: DroppedComponent[];
  setComponents: React.Dispatch<React.SetStateAction<DroppedComponent[]>>;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedId, components, setComponents }) => {
  const selected = components.find((c) => c.id === selectedId);

  if (!selected) {
    return (
      <div>
        <h2>Properties</h2>
        <p>Select a component to edit its properties</p>
      </div>
    );
  }

  // Handlers for property changes
  const handleChange = (key: keyof DroppedComponent, value: any) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === selectedId ? { ...comp, [key]: value } : comp
      )
    );
  };

  return (
    <div>
      <h2>Properties</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Text & TextArea */}
        {(selected.type === 'text' || selected.type === 'textarea') && (
          <>
            <label>
              Text:
              <input
                type="text"
                value={selected.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              />
            </label>
            <label>
              Font Size:
              <input
                type="number"
                min={8}
                max={96}
                value={selected.fontSize || 16}
                onChange={(e) => handleChange('fontSize', Number(e.target.value))}
                style={{ width: 60, marginLeft: 8 }}
              />
            </label>
            {selected.type === 'text' && (
              <label>
                Font Weight:
                <select
                  value={selected.fontWeight || '400'}
                  onChange={(e) => handleChange('fontWeight', e.target.value as '400' | '700')}
                  style={{ marginLeft: 8 }}
                >
                  <option value="400">400 - Normal</option>
                  <option value="700">700 - Bold</option>
                </select>
              </label>
            )}
            <label>
              Color:
              <input
                type="color"
                value={selected.color || '#f3f3f3'}
                onChange={(e) => handleChange('color', e.target.value)}
                style={{ marginLeft: 8 }}
              />
            </label>
            {selected.type === 'textarea' && (
              <label>
                Text Align:
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  {['left', 'center', 'right'].map((align) => (
                    <button
                      key={align}
                      style={{
                        background: selected.textAlign === align ? '#4fd1c5' : '#23272f',
                        color: '#f3f3f3',
                        border: '1px solid #333',
                        borderRadius: 4,
                        padding: '4px 12px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleChange('textAlign', align)}
                    >
                      {align.charAt(0).toUpperCase() + align.slice(1)}
                    </button>
                  ))}
                </div>
              </label>
            )}
          </>
        )}
        {/* Image */}
        {selected.type === 'image' && (
          <>
            <label>
              Image URL:
              <input
                type="text"
                value={selected.imageUrl || ''}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
                placeholder="https://..."
              />
            </label>
            <label>
              Alt Text:
              <input
                type="text"
                value={selected.altText || ''}
                onChange={(e) => handleChange('altText', e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              />
            </label>
            <label>
              Object Fit:
              <select
                value={selected.objectFit || 'cover'}
                onChange={(e) => handleChange('objectFit', e.target.value as 'cover' | 'contain' | 'fill')}
                style={{ marginLeft: 8 }}
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
                <option value="fill">Fill</option>
              </select>
            </label>
            <label>
              Border Radius:
              <input
                type="number"
                min={0}
                max={100}
                value={selected.borderRadius || 0}
                onChange={(e) => handleChange('borderRadius', Number(e.target.value))}
                style={{ width: 60, marginLeft: 8 }}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                min={20}
                max={600}
                value={selected.height || 120}
                onChange={(e) => handleChange('height', Number(e.target.value))}
                style={{ width: 60, marginLeft: 8 }}
              />
            </label>
            <label>
              Width:
              <input
                type="number"
                min={20}
                max={800}
                value={selected.width || 120}
                onChange={(e) => handleChange('width', Number(e.target.value))}
                style={{ width: 60, marginLeft: 8 }}
              />
            </label>
          </>
        )}
        {/* Button */}
        {selected.type === 'button' && (
          <>
            <label>
              URL:
              <input
                type="text"
                value={selected.url || ''}
                onChange={(e) => handleChange('url', e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
                placeholder="https://..."
              />
            </label>
            <label>
              Button Text:
              <input
                type="text"
                value={selected.buttonText || ''}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                style={{ width: '100%', marginTop: 4 }}
              />
            </label>
            <label>
              Font Size:
              <input
                type="number"
                min={8}
                max={48}
                value={selected.fontSize || 16}
                onChange={(e) => handleChange('fontSize', Number(e.target.value))}
                style={{ width: 60, marginLeft: 8 }}
              />
            </label>
            <label>
              Padding:
              <input
                type="number"
                min={0}
                max={48}
                value={selected.padding || 12}
                onChange={(e) => handleChange('padding', Number(e.target.value))}
                style={{ width: 60, marginLeft: 8 }}
              />
            </label>
            <label>
              Background Color:
              <input
                type="color"
                value={selected.backgroundColor || '#4fd1c5'}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                style={{ marginLeft: 8 }}
              />
            </label>
            <label>
              Text Color:
              <input
                type="color"
                value={selected.textColor || '#f3f3f3'}
                onChange={(e) => handleChange('textColor', e.target.value)}
                style={{ marginLeft: 8 }}
              />
            </label>
            <label>
              Border Radius:
              <input
                type="number"
                min={0}
                max={48}
                value={selected.borderRadius || 4}
                onChange={(e) => handleChange('borderRadius', Number(e.target.value))}
                style={{ width: 60, marginLeft: 8 }}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
