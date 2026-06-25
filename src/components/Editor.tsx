import React, { useState, useRef } from 'react';

export interface EditorProps {
  initialCode?: string;
}

const Editor: React.FC<EditorProps> = ({ initialCode = '@startuml\nAlice -> Bob: Hello!\n@enduml' }) => {
  const [code, setCode] = useState(initialCode);
  const [previewSrc, setPreviewSrc] = useState('');
  const debounceTimerRef = useRef<number | null>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);

    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      // Debounced preview update after 800ms
      const encoded = btoa(unescape(encodeURIComponent(newCode)));
      setPreviewSrc(`https://www.plantuml.com/plantuml/svg/${encoded}`);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', gap: '16px', height: '100%' }}>
      <textarea
        value={code}
        onChange={handleCodeChange}
        style={{ flex: 1, padding: '12px', fontFamily: 'monospace', fontSize: '14px', resize: 'none' }}
        placeholder="Skriv PlantUML-kod här..."
      />
      <div style={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa' }}>
        {previewSrc ? (
          <img src={previewSrc} alt="PlantUML Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          <p style={{ color: '#999' }}>Förhandsgranskning genereras...</p>
        )}
      </div>
    </div>
  );
};

export default Editor;
