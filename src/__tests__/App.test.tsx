import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Aura No-Code Editor', () => {
  test('renders all main panels', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Component Palette/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Canvas/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Properties/i })).toBeInTheDocument();
  });

  test('palette shows all component types', () => {
    render(<App />);
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('TextArea')).toBeInTheDocument();
    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  test('can add a Text component to the canvas (simulate drop)', () => {
    render(<App />);
    const canvas = screen.getByTestId('aura-canvas-inner');
    fireEvent.drop(canvas, {
      dataTransfer: {
        getData: () => 'text',
      },
      clientX: 100,
      clientY: 100,
      preventDefault: () => {},
    });
    // The dropped component should appear
    expect(screen.getAllByTestId('canvas-component').length).toBeGreaterThan(0);
  });

  test('selects a component and shows its properties', () => {
    render(<App />);
    const canvas = screen.getByTestId('aura-canvas-inner');
    fireEvent.drop(canvas, {
      dataTransfer: {
        getData: () => 'text',
      },
      clientX: 100,
      clientY: 100,
      preventDefault: () => {},
    });
    // Click the dropped component (simulate selection)
    const droppedText = screen.getAllByTestId('canvas-component')[0];
    expect(droppedText).toBeDefined();
    fireEvent.click(droppedText);
    // Properties panel should show text input
    expect(screen.getByLabelText(/Text:/i)).toBeInTheDocument();
  });

  test('updates text property and reflects on canvas', async () => {
    render(<App />);
    const canvas = screen.getByTestId('aura-canvas-inner');
    fireEvent.drop(canvas, {
      dataTransfer: {
        getData: () => 'text',
      },
      clientX: 100,
      clientY: 100,
      preventDefault: () => {},
    });
    // Select and update text
    const droppedText = screen.getAllByTestId('canvas-component')[0];
    fireEvent.click(droppedText);
    const textInput = screen.getByLabelText(/Text:/i);
    await userEvent.clear(textInput);
    await userEvent.type(textInput, 'Hello World');
    expect(await screen.findByDisplayValue('Hello World')).toBeInTheDocument();
    expect(await screen.findByText('Hello World')).toBeInTheDocument();
  });

  test('preview mode displays correct HTML and copy works', async () => {
    render(<App />);
    const canvas = screen.getByTestId('aura-canvas-inner');
    fireEvent.drop(canvas, {
      dataTransfer: {
        getData: () => 'button',
      },
      clientX: 120,
      clientY: 120,
      preventDefault: () => {},
    });
    // Switch to preview mode
    await userEvent.click(screen.getByText('Preview'));
    expect(await screen.findByTestId('back-button')).toBeInTheDocument();
    expect(await screen.findByText('Button')).toBeInTheDocument();
    // Copy HTML
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
    await userEvent.click(screen.getByText('Copy HTML'));
    expect(await screen.findByText('Copied!')).toBeInTheDocument();
  });
});
