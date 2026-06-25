// AI-assistent: Genererar PlantUML-kod från naturlig språkbildskrivning
// ================================================================
// Konfiguration av faktisk LLM:
// 1. Skapa en .env-fil med t.ex.: VITE_OPENAI_API_KEY=sk-din-api-nyckel-här
// 2. Aktivera OpenAI-koden nedan (avkommentera) och ta bort placeholder-logiken
// 3. Installera nödvändiga paket vid behov: npm i openai (valfritt)

export async function generatePlantUmlFromDescription(description: string): Promise<string> {
  /*
  // === FAKTISK OPENAI-INTEGRATION (avkommentera och sätt in API-nyckel) ===
  
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'AI-API-nyckel saknas. Skapa en .env-fil med VITE_OPENAI_API_KEY="sk-din-nyckel-här".'
    );
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Du är en expert på PlantUML. Generera ENDAST ren PlantUML-kod. Inga förklaringar, inga markdown-blok med ```plantuml. Börja med @startuml och avsluta med @enduml.',
        },
        {
          role: 'user',
          content: `Generera PlantUML-kod för detta diagram:\n${description}`,
        },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`AI API misslyckades (${response.status}): ${errText}`);
  }

  const data = await response.json();
  let code = data.choices?.[0]?.message?.content || '';
  
  // Ta bort eventuella markdown-blok om modellen ändå lägger till dem
  code = code.replace(/\s*```(plantuml|plantUML|puml)?\s*/g, '').replace(/\s*```\s*/g, '');
  
  return code.trim();
  */

  // === PLACEHOLDER-IMPLEMENTERING ===
  // Detta är en provisorisk lösning som genererar PlantUML baserat på nyckelord.
  // Ersätt med koden ovan (eller annan LLM) för faktisk AI-generering.
  console.warn(
    '[AI-Assistent] Använder placeholder-respons. Konfigurera en riktig LLM-API-nyckel i .env och avkommentera OpenAI-koden i src/services/ai.ts'
  );

  return generatePlaceholderPlantUml(description);
}

/**
 * Placeholder: genererar enkelt PlantUML baserat på nyckelord i beskrivningen.
 */
function generatePlaceholderPlantUml(description: string): string {
  const lower = description.toLowerCase();

  if (lower.includes('sekvens') || lower.includes('sequence')) {
    return `@startuml
actor Kunde
participant "Webbutik" as Web
participant "Betalsystem" as Payment
Kunde -> Web: Gör beställning
Web -> Payment: Begär betalning
Payment --> Web: Bekräftelse
Web --> Kunde: Beställningsbekräftelse
@enduml`;
  }

  if (lower.includes('klass') || lower.includes('class')) {
    return `@startuml
class Animal {
  +name: string
  +age: number
  +speak(): void
}
class Dog {
  +breed: string
  +fetch(): void
}
Animal <|-- Dog
@enduml`;
  }

  if (lower.includes('aktivitet') || lower.includes('activity')) {
    return `@startuml
start
:Användaren öppnar appen;
if (Inloggad?) then (ja)
  :Visa innehåll;
else (nej)
  :Visa inloggningsformulär;
endif
stop
@enduml`;
  }

  // Default fallback
  return `@startuml
title AI-genererat diagram
actor Användare
participant System
Användare -> System: Begäran om diagram
System --> Användare: Diagram visat
note right: Detta diagram genererades av AI-assistenten utifrån din textbeskrivning.\nKonfigurera en riktig LLM för bättre resultat.
@enduml`;
}
