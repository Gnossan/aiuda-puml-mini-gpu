import { encode } from 'plantuml-encoder';

const PLANTUML_SERVER = 'https://www.plantuml.com/plantuml';

export function getPlantUmlImageUrl(pumlCode: string, format: 'svg' | 'png' = 'svg'): string | null {
  try {
    const encoded = encode(pumlCode);
    return `${PLANTUML_SERVER}/${format}/${encoded}`;
  } catch (e) {
    console.error('Failed to encode PlantUML code:', e);
    return null;
  }
}

export interface RenderResult {
  data: ArrayBuffer;
  format: 'svg' | 'png';
}

export function renderPlantUml(pumlCode: string): Promise<RenderResult> {
  const imageUrl = getPlantUmlImageUrl(pumlCode);
  if (!imageUrl) return Promise.reject(new Error('Could not generate PlantUML image URL'));

  return fetch(imageUrl)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.arrayBuffer();
    })
    .then(data => ({ data, format: 'svg' }));
}
