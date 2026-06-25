# 🌱 Aiuda - PlantUML Editor med AI

En enkel webapp för att redigera, rendera och få AI-assisterad hjälp med PlantUML-diagram.

## Teknikstack

Följande teknikstack har valts för grundstrukturen:

| Komponent | Val | Varför |
|-----------|-----|--------|
| **Frontend** | React 18 | Stort ekosystem, många redo-tillgängliga komponenter (t.ex. Monaco Editor), bra community-stöd |
| **Build Tool** | Vite | Mycket snabb utvecklings-server och build-prestanda jämfört med Webpack |
| **Språk** | TypeScript | Typsäkerhet som underlättar underhåll och refaktorering när appen växer |
| **Stil** | CSS (vanlig) | Enkel start utan extra komplexitet från CSS-in-JS lösningar |

### Varför inte andra alternativ?
- **Vue/Svelte**: Bra alternativ men React har bättre stöd för avancerade editor-komponenter
- **Node.js/Express backend**: Kan tilläggas senare när AI-integration kräver server-sida logik
- **Tailwind/CSS-modules**: Håller det enkelt från början, kan migrera senare vid behov

## Hur man kör lokalt

1. Installera beroenden:
   ```bash
   npm install
   ```

2. Starta utvecklings-servern:
   ```bash
   npm run dev
   ```

3. Öppna `http://localhost:5173` i webbläsaren.

4. Bygg för produktion:
   ```bash
   npm run build
   ```

## Projektstruktur

```
aiuda-puml-mini-gpu/
├── package.json          # Beroenden och scripts
├── vite.config.ts        # Vite-konfiguration
├── tsconfig.json         # TypeScript-konfiguration
├── index.html            # Entry point
├── README.md             # Denna fil
└── src/
    ├── main.tsx          # App-start
    ├── App.tsx           # Huvudkomponent med editor & preview
    └── styles/
        └── index.css     # Grundläggande stilning
```

## Nästa steg

- [ ] Integrera en riktig code editor (Monaco eller CodeMirror)
- [ ] PlantUML rendering via plantuml-serve eller backend-API
- [ ] AI-chatt-gränssnitt för diagram-förslag
- [ ] Filsystem-stöd och export av diagram

## Licens

MIT
