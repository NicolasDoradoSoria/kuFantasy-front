import type { StoreType } from "@/utils/enums/storeType";

export type StoreDTO = {
    id: number;
    name: string;
    type: StoreType;
    imageUrl: string;
}