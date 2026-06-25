import { useEffect, useState, useCallback, useRef } from 'react'
import { renderPlantUml, getPlantUmlImageUrl } from './utils/plantuml'

const DEBOUNCE_MS = 800

// Test-exempel: Sekvensdiagram, Klassdiagram, Use Case-diagram
const TEST_EXAMPLES = {
  sequenceDiagram: `@startuml
Alice -> Bob: Hello!
Bob --> Alice: Hi there!
Alice -> Bob: How are you?
@enduml`,
  classDiagram: `@startuml
class Animal {
  +name: String
  +age: int
  +eat(): void
}
class Dog {
  +bark(): void
}
class Cat {
  +meow(): void
}
Animal <|-- Dog
Animal <|-- Cat
@enduml`,
  useCaseDiagram: `@startuml
left to right direction
actor User
rectangle System {
  usecase Login as UC1
  usecase Browse_Catalog as UC2
  usecase Add_to_Cart as UC3
}
User --> UC1
UC1 ..> UC2 : include
UC2 ..> UC3 : extend
@enduml`
}

function App() {
  const [pumlCode, setPumlCode] = useState(TEST_EXAMPLES.sequenceDiagram)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounced rendering för att undvika för många anrop
  const debouncedRender = useCallback((code: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    
    debounceTimerRef.current = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        // Använd direkt URL för enkel visning i <img>-tagg
        const url = getPlantUmlImageUrl(code, 'svg')
        if (url) {
          setImageUrl(url)
        } else {
          setError('Kunde inte generera bild-URL. Kontrollera PlantUML-koden.')
        }
      } catch (err: any) {
        setError(err.message || 'Ett okänt fel uppstod vid rendering')
      } finally {
        setLoading(false)
      }
    }, DEBOUNCE_MS)
  }, [])

  useEffect(() => {
    debouncedRender(pumlCode)
    
    // Cleanup på unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [pumlCode, debouncedRender])

  const handleExampleChange = (type: keyof typeof TEST_EXAMPLES) => {
    setPumlCode(TEST_EXAMPLES[type])
  }

  return (
    <div className="app-container">
      <header>
        <h1>🌱 Aiuda - PlantUML Editor med AI</h1>
      </header>
      <main className="main-layout">
        <div className="editor-panel">
          <h2>📝 Editor</h2>
          
          {/* Exempel-väljare */}
          <div className="example-selectors">
            <button onClick={() => handleExampleChange('sequenceDiagram')} title="Sekvensdiagram-exempel">
              📜 Sekvens
            </button>
            <button onClick={() => handleExampleChange('classDiagram')} title="Klassdiagram-exempel">
              🏗️ Klass
            </button>
            <button onClick={() => handleExampleChange('useCaseDiagram')} title="Use Case-diagram-exempel">
              👤 Use Case
            </button>
          </div>

          <textarea
            value={pumlCode}
            onChange={(e) => setPumlCode(e.target.value)}
            placeholder="Skriv din PlantUML-kod här..."
            rows={15}
            spellCheck={false}
          />
          <p className="hint">Din PlantUML-kod redigeras här. Rendering sker automatiskt med debounce (800ms).</p>
        </div>
        <div className="preview-panel">
          <h2>👁️ Förhandsgranskning</h2>
          
          {loading && <div className="loading-indicator">Rendering...</div>}
          
          {error ? (
            <div className="error-message">
              <strong>Fel:</strong> {error}
            </div>
          ) : imageUrl ? (
            <div className="image-container">
              <img src={imageUrl} alt="Rendered PlantUML diagram" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          ) : (
            <div className="placeholder">
              <p>Börja skriva PlantUML-kod för att se rendering här...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
