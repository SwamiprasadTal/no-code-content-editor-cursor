import React, { useRef, useCallback, useState, useLayoutEffect } from 'react';

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

const COMPONENT_LABELS: Record<string, string> = {
  text: 'Text',
  textarea: 'TextArea',
  image: 'Image',
  button: 'Button',
};

const COMPONENT_MIN_WIDTH = 80;
const COMPONENT_MIN_HEIGHT = 32;

const CanvasPanel = ({ components, setComponents, selectedId, setSelectedId }: {
  components: DroppedComponent[];
  setComponents: React.Dispatch<React.SetStateAction<DroppedComponent[]>>;
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const draggingIdRef = useRef<string | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Store measured sizes for each component
  const [measuredSizes, setMeasuredSizes] = useState<Record<string, { width: number; height: number }>>({});
  const compRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // After render, measure each component's size
  useLayoutEffect(() => {
    const newSizes: Record<string, { width: number; height: number }> = {};
    components.forEach((comp) => {
      const ref = compRefs.current[comp.id];
      if (ref) {
        const rect = ref.getBoundingClientRect();
        newSizes[comp.id] = { width: rect.width, height: rect.height };
      }
    });
    setMeasuredSizes((prev) => ({ ...prev, ...newSizes }));
  }, [components.map(c => c.id).join(','), components.map(c => c.text).join(','), components.map(c => c.buttonText).join(','), components.map(c => c.width).join(','), components.map(c => c.height).join(','), components.map(c => c.fontSize).join(','), components.map(c => c.padding).join(',')]);

  // Clamp position to keep component inside canvas
  const clampPosition = (x: number, y: number, comp: DroppedComponent) => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return { x, y };
    const size = measuredSizes[comp.id] || { width: COMPONENT_MIN_WIDTH, height: COMPONENT_MIN_HEIGHT };
    const minX = 0;
    const minY = 0;
    const maxX = canvasRect.width - size.width;
    const maxY = canvasRect.height - size.height;
    return {
      x: Math.max(minX, Math.min(x, maxX)),
      y: Math.max(minY, Math.min(y, maxY)),
    };
  };

  // Handle drop from palette
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('component-type');
    if (!type) return;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    let x = e.clientX - (canvasRect?.left || 0);
    let y = e.clientY - (canvasRect?.top || 0);
    // Default properties for new components
    const defaultProps: Partial<DroppedComponent> =
      type === 'text' || type === 'textarea'
        ? { text: type === 'text' ? 'Text' : 'TextArea', fontSize: 16, color: '#f3f3f3', fontWeight: '400', textAlign: 'left' }
        : type === 'image'
        ? { imageUrl: '', altText: '', objectFit: 'cover', borderRadius: 0, height: 120, width: 120 }
        : type === 'button'
        ? { url: '', buttonText: 'Button', fontSize: 16, padding: 12, backgroundColor: '#4fd1c5', textColor: '#f3f3f3', borderRadius: 4 }
        : {};
    // Create a temp id for measurement
    const tempId = `${type}-${Date.now()}-${Math.random()}`;
    const tempComp = { id: tempId, type, x, y, ...defaultProps } as DroppedComponent;
    const clamped = clampPosition(x, y, tempComp);
    setComponents((prev) => [
      ...prev,
      {
        ...tempComp,
        x: clamped.x,
        y: clamped.y,
      },
    ]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Mouse move logic for moving components
  const handleMouseDown = (
    e: React.MouseEvent,
    id: string,
    compX: number,
    compY: number
  ) => {
    e.stopPropagation();
    setSelectedId(id);
    draggingIdRef.current = id;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    dragOffsetRef.current = {
      x: e.clientX - (canvasRect?.left || 0) - compX,
      y: e.clientY - (canvasRect?.top || 0) - compY,
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const id = draggingIdRef.current;
    if (!id) return;
    const comp = components.find((c) => c.id === id);
    if (!comp) return;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    let x = e.clientX - (canvasRect?.left || 0) - dragOffsetRef.current.x;
    let y = e.clientY - (canvasRect?.top || 0) - dragOffsetRef.current.y;
    // Clamp position using measured size
    const clamped = clampPosition(x, y, comp);
    setComponents((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, x: clamped.x, y: clamped.y } : c
      )
    );
  }, [setComponents, components, measuredSizes]);

  const handleMouseUp = useCallback(() => {
    draggingIdRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  // Deselect on canvas click
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedId(null);
    }
  };

  // Render dropped components with their properties
  const renderComponent = (comp: DroppedComponent) => {
    if (comp.type === 'text') {
      return (
        <div
          style={{
            fontSize: comp.fontSize || 16,
            fontWeight: comp.fontWeight || '400',
            color: comp.color || '#f3f3f3',
            pointerEvents: 'none',
          }}
        >
          {comp.text || 'Text'}
        </div>
      );
    }
    if (comp.type === 'textarea') {
      return (
        <div
          style={{
            fontSize: comp.fontSize || 16,
            color: comp.color || '#f3f3f3',
            textAlign: comp.textAlign || 'left',
            minWidth: 80,
            minHeight: 32,
            pointerEvents: 'none',
          }}
        >
          {comp.text || 'TextArea'}
        </div>
      );
    }
    if (comp.type === 'image') {
      return (
        <img
          src={comp.imageUrl || 'https://via.placeholder.com/120x120?text=Image'}
          alt={comp.altText || 'Image'}
          style={{
            width: comp.width || 120,
            height: comp.height || 120,
            objectFit: comp.objectFit || 'cover',
            borderRadius: comp.borderRadius || 0,
            display: 'block',
            pointerEvents: 'none',
            background: '#23272f',
          }}
        />
      );
    }
    if (comp.type === 'button') {
      return (
        <a
          href={comp.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontSize: comp.fontSize || 16,
            padding: (comp.padding ?? 12),
            background: comp.backgroundColor || '#4fd1c5',
            color: comp.textColor || '#f3f3f3',
            border: 'none',
            borderRadius: comp.borderRadius || 4,
            textDecoration: 'none',
            fontWeight: 500,
            pointerEvents: 'none',
            minWidth: 80,
          }}
        >
          {comp.buttonText || 'Button'}
        </a>
      );
    }
    // Placeholder for other types
    return <div style={{ pointerEvents: 'none' }}>{COMPONENT_LABELS[comp.type] || comp.type}</div>;
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <h2>Canvas</h2>
      <div
        ref={canvasRef}
        className="aura-canvas-inner"
        data-testid="aura-canvas-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: 400,
          background: '#181a1b',
          border: '1px dashed #444',
          borderRadius: 12,
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleCanvasClick}
      >
        {components.map((comp) => (
          <div
            key={comp.id}
            ref={el => (compRefs.current[comp.id] = el)}
            data-testid="canvas-component"
            style={{
              position: 'absolute',
              left: comp.x,
              top: comp.y,
              background: selectedId === comp.id ? '#2d3748' : '#23272f',
              color: '#f3f3f3',
              padding: 12,
              borderRadius: 8,
              border: selectedId === comp.id ? '2px solid #4fd1c5' : '1px solid #333',
              minWidth: 80,
              textAlign: 'center',
              cursor: draggingIdRef.current === comp.id ? 'grabbing' : 'pointer',
              userSelect: 'none',
              zIndex: selectedId === comp.id ? 2 : 1,
              boxShadow: selectedId === comp.id ? '0 0 0 2px #4fd1c533' : undefined,
            }}
            onMouseDown={(e) => handleMouseDown(e, comp.id, comp.x, comp.y)}
            onClick={(e) => { e.stopPropagation(); setSelectedId(comp.id); }}
          >
            {renderComponent(comp)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanvasPanel;
