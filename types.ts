export interface Pokemon {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    stats?: { stat: { name: string }; base_stat: number }[]; // Opcional para detalles
  }