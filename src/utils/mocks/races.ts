import type { RaceDTO } from "@/dto/races/RaceDTO";

export const mockRaces: RaceDTO[] = [
    {
        id: 1,
        name: "Orco",
        description: "Los orcos son fuertes y resistentes, ideales para el combate cuerpo a cuerpo.",
        imageUrl: "/public/elfo.png", // Cambia por /public/orco.png cuando tengas la imagen
        baseStats: {
            life: 100,
            attack: 20,
            defense: 10,
            speed: 5,
            magic: 5
        },
        colorTheme: {
            primary: "from-red-500 to-orange-600",
            secondary: "from-red-400 to-orange-500",
            bgColor: "from-red-50 to-orange-50"
        }
    },
    {
        id: 2,
        name: "Elfo",
        description: "Los elfos son ágiles y sabios, expertos en magia y arquería.",
        imageUrl: "/public/elfo.png",
        baseStats: {
            life: 80,
            attack: 10,
            defense: 15,
            speed: 20,
            magic: 15
        },
        colorTheme: {
            primary: "from-green-500 to-emerald-600",
            secondary: "from-green-400 to-emerald-500",
            bgColor: "from-green-50 to-emerald-50"
        }
    },
    {
        id: 3,
        name: "Humano",
        description: "Los humanos son equilibrados y versátiles, adaptándose a cualquier situación.",
        imageUrl: "/public/elfo.png", // Cambia por /public/humano.png cuando tengas la imagen
        baseStats: {
            life: 90,
            attack: 15,
            defense: 15,
            speed: 15,
            magic: 10
        },
        colorTheme: {
            primary: "from-blue-500 to-indigo-600",
            secondary: "from-blue-400 to-indigo-500",
            bgColor: "from-blue-50 to-indigo-50"
        }
    },
    {
        id: 4,
        name: "Enano",
        description: "Los enanos son robustos y expertos en armas pesadas y minería.",
        imageUrl: "/public/enano.png",
        baseStats: {
            life: 110,
            attack: 25,
            defense: 20,
            speed: 5,
            magic: 10
        },
        colorTheme: {
            primary: "from-amber-500 to-yellow-600",
            secondary: "from-amber-400 to-yellow-500",
            bgColor: "from-amber-50 to-yellow-50"
        }
    },
    {
        id: 5,
        name: "Gnomo",
        description: "Los gnomos son pequeños, rápidos y muy inteligentes.",
        imageUrl: "/public/elfo.png", // Cambia por /public/gnomo.png cuando tengas la imagen
        baseStats: {
            life: 70,
            attack: 5,
            defense: 10,
            speed: 15,
            magic: 20
        },
        colorTheme: {
            primary: "from-purple-500 to-pink-600",
            secondary: "from-purple-400 to-pink-500",
            bgColor: "from-purple-50 to-pink-50"
        }
    }
]; 