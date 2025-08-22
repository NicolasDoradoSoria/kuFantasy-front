import { 
    GiCastle, 
    GiGreekTemple, 
    GiShop, 
    GiPineTree, 
    GiMountainRoad, 
    GiWatchtower, 
    GiCrossedSwords, 
    GiVillage, 
    GiStonePath, 
    GiCaveEntrance, 
    GiDesert, 
    GiIceberg,
  } from "react-icons/gi";
  


// Mapeo de tipos de territorio a iconos de react-icons
export const territoryIcons = {
    castle: GiCastle,
    city: GiGreekTemple, 
    shop: GiShop,
    forest: GiPineTree,
    mountain: GiMountainRoad,
    tower: GiWatchtower,
    danger: GiCrossedSwords,
    village: GiVillage,
    ruins: GiStonePath,
    cave: GiCaveEntrance,
    desert: GiDesert,
    ice: GiIceberg
  };
  
  // Colores personalizados para cada tipo de territorio usando Tailwind CSS
  export const territoryColors = {
    castle: "text-amber-800", // Marrón dorado para castillos
    city: "text-yellow-400", // Dorado para ciudades
    shop: "text-green-500", // Verde lima para tiendas
    forest: "text-green-700", // Verde bosque
    mountain: "text-gray-600", // Gris piedra
    tower: "text-blue-600", // Azul real
    danger: "text-red-600", // Rojo carmesí
    village: "text-amber-200", // Marrón claro para aldeas
    ruins: "text-amber-900", // Marrón siena
    cave: "text-gray-700", // Gris oscuro
    desert: "text-amber-300", // Marrón arena
    ice: "text-sky-400" // Azul cielo
  };