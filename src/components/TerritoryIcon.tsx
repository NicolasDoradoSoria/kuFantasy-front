import { territoryColors, territoryIcons } from "@/utils/icons/territoryIcons";
import { GiHelp } from "react-icons/gi";
import React from "react";

interface TerritoryIconProps {
  type: string;
  selected?: boolean;
  onClick?: () => void;
  title?: string;
  style?: React.CSSProperties;
}

const TerritoryIcon: React.FC<TerritoryIconProps> = ({ type, selected, onClick, title, style, children}) => {
  const typeKey = type.toLowerCase();
  const IconComponent = territoryIcons[typeKey as keyof typeof territoryIcons] || GiHelp;
  const iconColorClass = territoryColors[typeKey as keyof typeof territoryColors] || "text-gray-500";

  return (
    <span
      className={`inline-flex items-center justify-center p-2 rounded-full border-2 border-yellow-700 shadow-lg ${iconColorClass}`}
      style={{
        background: `url('/pergamino-texture.png'), linear-gradient(135deg, #b4a078 0%, #6c584c 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: selected ? "0 0 16px 4px #f9d923" : undefined,
        ...style,
      }}
      title={title}
      onClick={onClick}
      role="button"
      aria-label={title || type}
    >
      <IconComponent className={`w-8 h-8 ${iconColorClass}`} />
      {children}
    </span>
  );
};

export default TerritoryIcon;
