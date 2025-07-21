export type RaceDTO = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    baseStats: {
        life: number;
        attack: number;
        defense: number;
        speed: number;
        magic: number;
    },
    colorTheme: {
        primary: string;
        secondary: string;
        bgColor: string;
    }
}
