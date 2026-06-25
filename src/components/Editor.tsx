import React, { useState, useRef } from 'react';
import { generatePlantUmlFromDescription } from '../services/ai';

export interface EditorProps {
  initialCode?: string;
}

const Editor: React.FC<EditorProps> = ({
  initialCode = '@startuml\nAlice -> Bob: Hello!\n@enduml',
}) => {
  const [code, setCode] = useState(initialCode);
  const [previewSrc, setPreviewSrc] = useState('');
  const [aiDescription, setAiDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const debounceTimerRef = useRef<number | null>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);

    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      const encoded = btoa(unescape(encodeURIComponent(newCode)));
      setPreviewSrc(`https://www.plantuml.com/plantuml/svg/${encoded}`);
    }, 800);
  };

  const handleAiGenerate = async () => {
    if (!aiDescription.trim()) return;

    setIsGenerating(true);
    try {
      const generatedCode = await generatePlantUmlFromDescription(aiDescription);
      setCode(generatedCode);

      // Omedelbar preview-uppdatering för genererad kod
      const encoded = btoa(unescape(encodeURIComponent(generatedCode)));
      setPreviewSrc(`https://www.plantuml.com/plantuml/svg/${encoded}`);
    } catch (error) {
      console.error('Misslyckades med att generera PlantUML-kod:', error);
      alert(
        'Ett fel inträffade vid AI-generering. Kontrollera konsolen för detaljer.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      {/* AI-Assistent panel */}
      <div
        style={{
          padding: '12px',
          backgroundColor: '#f0f7ff',
          borderRadius: '8px',
          border: '1px solid #cce5ff',
        }}
      >
        <h3
          style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#0066cc' }}
        >
          🤖 AI-Assistent
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={aiDescription}
            onChange={(e) => setAiDescription(e.target.value)}
            placeholder="Beskriv diagrammet (t.ex. &quot;sekvensdiagram mellan kund och webbutik&quot;)..."
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '13px',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isGenerating) handleAiGenerate();
            }}
          />
          <button
            onClick={handleAiGenerate}
            disabled={isGenerating || !aiDescription.trim()}
            style={{
              padding: '8px 16px',
              backgroundColor: isGenerating ? '#ccc' : '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',n              cursor:
                isGenerating || !aiDescription.trim()
                  ? 'not-allowed'
                  : 'pointer',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            {isGenerating ? 'Genererar...' : 'Generera'}
          </button>
        </div>
      </div>

      {/* PlantUML-editor och förhandsgranskning */}
      <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
        <textarea
          value={code}
          onChange={handleCodeChange}
          style={{
            flex: 1,
            padding: '12px',
            fontFamily: 'monospace',
            fontSize: '14px',
            resize: 'none',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
          placeholder="Skriv PlantUML-kod här..."
        />
        <div
          style={{
            flex: 1,
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
          }}
        >
          {previewSrc ? (
            <img
              src={previewSrc}
              alt="PlantUML Preview"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          ) : (
            <p style={{ color: '#999' }}>Förhandsgranskning genereras...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
