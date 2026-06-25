import { useState, useRef } from 'react';
import { renderDiagram } from './plantuml';

export function Editor() {
  const [input, setInput] = useState(
    '@startuml\nAlice -> Bob: Hello\nBob --> Alice: Hi!\n@enduml'
  );
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState('');

  const handleRender = async () => {
    setIsLoading(true);
    try {
      const result = await renderDiagram(input);
      setSvgContent(result.svg);
      setExplanation(result.explanation || '');
    } catch (err) {
      setSvgContent('');
      setExplanation('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!svgContent) return;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aiuda-diagram.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <div style={{ flex: 1 }}>
        <h2>Redigera diagram</h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', minHeight: '300px', fontFamily: 'monospace' }}
        />
        <div style={{ marginTop: '0.5rem' }}>
          <button onClick={handleRender} disabled={isLoading}>
            {isLoading ? 'Rendering...' : 'Rendera diagram'}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, border: '1px solid #ccc', padding: '0.5rem' }}>
        <h2>Förhandsgranskning</h2>
        {isLoading && <p>Rendering...</p>}
        {svgContent && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <div
              dangerouslySetInnerHTML={{ __html: svgContent }}
              style={{ width: '100%' }}
            />
            <button onClick={handleExport} title="Ladda ner diagram som SVG-fil">
              Exportera
            </button>
          </div>
        )}
        {explanation && (
          <details style={{ marginTop: '1rem' }}>
            <summary>AI-förklaring</summary>
            <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '0.5rem' }}>
              {explanation}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
