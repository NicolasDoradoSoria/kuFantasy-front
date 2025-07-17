import type { TerritoryDTO } from "@/dto/territory/TerritoryDTO";

export const Territories: TerritoryDTO[] = [
    {
      id: 5302,
      name: "Torre Arcana",
      overview: "torre magica simple",
      history: "Una antigua torre de hechicería prohibida.",
      level: 10,
      difficulty: "HARD",
      type: "TOWER",
      info: {
        shortDescription: "Torre que irradia energía oscura.",
        longDescription: "Abandonada hace mil años, ahora vuelve a activarse lentamente...",
        features: ["MAGIC_ZONE", "TRADE_CENTER"]
      },
      resources: [
        { id: 504, name: "Cristal arcano", rarity: 5 }
      ],
      enemies: [
        { id: 203, name: "Espectro", level: 2 }
      ],
      position: { top: "30%", left: "60%" }
    },
    {
      "id": 5304,
      "name": "Bosque Encantado",
      "overview": "gran bosque encantado",
      "history": "Un bosque misterioso lleno de magia.",
      "level": 5,
      "difficulty": "MEDIUM",
      "type": "FOREST",
      "info": {
        "shortDescription": "Un lugar magico donde lso arboles susurran.",
        "longDescription": "EL Bosque esta encantado desde hace siglos. los elfos y criatiras misticas lo habitan.",
        "features": [
          "MAGIC_ZONE",
          "SAFE"
        ]
      },
      "resources": [
        {
          "id": 502,
          "name": "Hierba magica",
          "rarity": 2
        },
        {
          "id": 503,
          "name": "madera encantada",
          "rarity": 3
        }
      ],
      "enemies": [
        {
          "id": 202,
          "name": "Orco",
          "level": 1
        }
      ],
      position: { top: "60%", left: "20%" }

    }
    
    // ...puedes agregar más territorios aquí
  ];