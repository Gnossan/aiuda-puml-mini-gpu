import { useState } from 'react'

function App() {
  const [pumlCode, setPumlCode] = useState('# Hello PlantUML\n@startuml\nAlice -> Bob: Hello!\n@enduml')

  return (
    <div className="app-container">
      <header>
        <h1>🌱 Aiuda - PlantUML Editor med AI</h1>
      </header>
      <main className="main-layout">
        <div className="editor-panel">
          <h2>📝 Editor</h2>
          <textarea
            value={pumlCode}
            onChange={(e) => setPumlCode(e.target.value)}
            placeholder="Skriv din PlantUML-kod här..."
            rows={15}
          />
          <p className="hint">Din PlantUML-kod redigeras här. Rendering sker i höger panel.</p>
        </div>
        <div className="preview-panel">
          <h2>👁️ Förhandsgranskning</h2>
          <div className="placeholder">
            <p>Rendering av PlantUML kommer här...</p>
            <code>{pumlCode}</code>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
