import { useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { useOnInit } from "@/hooks/useOnInit";
import type { StoreType } from "@/utils/enums/storeType";
import PropertyImage from "@/views/components/propertyImage";
import PropertyInfo from "@/views/components/propertyInfo";

// Interfaces para las propiedades
interface HouseProperty {
  id: number;
  name: string;
  type: "house";
}

interface StoreProperty {
  id: number;
  name: string;
  storeType: StoreType;
  imageUrl: string;
  type: "store";
}

type PropertyData = HouseProperty | StoreProperty;

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);

  useOnInit(async () => {
    // Mock data mientras no tienes el servicio
    const mockProperty: PropertyData =
      type === "store"
        ? {
            id: Number(id),
            name: "Herrería del Dragón",
            storeType: "BLACKSMITH" as StoreType,
            imageUrl: "/ciudad-medieval.jpg",
            type: "store" as const,
          }
        : {
            id: Number(id),
            name: "Casa de los Vientos",
            type: "house" as const,
          };

    setProperty(mockProperty);
    setLoading(false);
  });

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#e9d8a6] via-[#b4a078] to-[#6c584c]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-900"></div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#e9d8a6] via-[#b4a078] to-[#6c584c]">
        <h1 className="text-4xl font-bold text-amber-900">
          Propiedad no encontrada
        </h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col mt-[50px] md:flex-row min-h-screen bg-gradient-to-br from-[#e9d8a6] via-[#b4a078] to-[#6c584c] relative overflow-hidden">
      {/* Textura de fondo sutil */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-yellow-900/20 via-transparent to-yellow-700/20"></div>

      {/* Imagen */}
      <PropertyImage
        imageUrl={property.type === "store" ? property.imageUrl : ""}
        name={property.name}
        type={property.type}
      />

      {/* Detalles */}
      <PropertyInfo property={property} />
    </main>
  );
};

export default PropertyDetailPage;
