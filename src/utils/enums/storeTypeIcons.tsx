import {Shield, MagicWand, Flask, Bed, Horse, Fish, Leaf, PawPrint, Book, MapTrifold, ShoppingCart, Target, Storefront, SketchLogo, Sword } from "phosphor-react";
import type { JSX } from "react";

export const storeTypeIcons: Record<string, JSX.Element> = {
    BLACKSMITH: <Sword size={32} weight="duotone" />,
    TAVERN: <Bed size={32} weight="duotone" />,
    ARMOR_SHOP: <Shield size={32} weight="duotone" />,
    WEAPON_SHOP: <Target size={32} weight="duotone" />,
    MAGIC_SHOP: <MagicWand size={32} weight="duotone" />,
    ALCHEMY_SHOP: <Flask size={32} weight="duotone" />,
    INN: <Bed size={32} weight="duotone" />,
    STABLE: <Horse size={32} weight="duotone" />,
    FISHMONGER: <Fish size={32} weight="duotone" />,
    BAKERY: <Bed size={32} weight="duotone" />,
    HERBALIST: <Leaf size={32} weight="duotone" />,
    JEWELRY_SHOP: <SketchLogo size={32} weight="duotone" />,
    PET_SHOP: <PawPrint size={32} weight="duotone" />,
    BOOKSTORE: <Book size={32} weight="duotone" />,
    CURIO_SHOP: <SketchLogo size={32} weight="duotone" />,
    CARTOGRAPHER: <MapTrifold size={32} weight="duotone" />,
    HUNTER_SHACK: <Target size={32} weight="duotone" />,
    FLETCHER: <Sword size={32} weight="duotone" />,
    FARMERS_MARKET: <ShoppingCart size={32} weight="duotone" />,
    GENERAL_STORE: <Storefront size={32} weight="duotone" />
  };