import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Character {
    id: string;
    name: string;
    class: string;
    level: number;
    race: string;
    avatar?: string;
    stats: {
        hp: { current: number; max: number };
        ac: number;
        proficiencyBonus: number;
        weaponDamage: string;
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
    };
    inventory: {
        gold: number;
        weight: { current: number; max: number };
        equippedItems: number;
        maxEquipped: number;
        items: any[];
    };
    quests: {
        active: any[];
        completed: any[];
    };
    exploration: {
        locationsDiscovered: number;
        dungeonsExplored: number;
        citiesVisited: number;
    };
    xp: {
        current: number;
        total: number;
    };
    sessionsPlayed: number;
}

// Default character data
const defaultCharacterData: Record<string, Character> = {
    aranis: {
        id: "aranis",
        name: "Aranis",
        class: "Paladin",
        level: 7,
        race: "Humain",
        avatar: "",
        stats: {
            hp: { current: 95, max: 98 },
            ac: 18,
            proficiencyBonus: 3,
            weaponDamage: "1d8+4",
            strength: 16,
            dexterity: 10,
            constitution: 14,
            intelligence: 12,
            wisdom: 13,
            charisma: 16,
        },
        inventory: {
            gold: 340,
            weight: { current: 25, max: 40 },
            equippedItems: 8,
            maxEquipped: 15,
            items: [],
        },
        quests: {
            active: [
                {
                    id: "1",
                    title: "La Lame Sacrée",
                    description: "Récupérer l'épée légendaire des anciens paladins",
                    status: "Active",
                    progress: 60,
                },
            ],
            completed: [],
        },
        exploration: {
            locationsDiscovered: 8,
            dungeonsExplored: 2,
            citiesVisited: 4,
        },
        xp: {
            current: 1200,
            total: 23000,
        },
        sessionsPlayed: 10,
    },
    sfiriri: {
        id: "sfiriri",
        name: "Sfiriri",
        class: "Magicien",
        level: 6,
        race: "Elfe",
        avatar: "",
        stats: {
            hp: { current: 42, max: 48 },
            ac: 12,
            proficiencyBonus: 3,
            weaponDamage: "1d4",
            strength: 8,
            dexterity: 14,
            constitution: 10,
            intelligence: 18,
            wisdom: 15,
            charisma: 11,
        },
        inventory: {
            gold: 205,
            weight: { current: 25, max: 45 },
            equippedItems: 6,
            maxEquipped: 12,
            items: [],
        },
        quests: {
            active: [
                {
                    id: "2",
                    title: "Le Grimoire Perdu",
                    description: "Trouver l'ancien grimoire de magie élémentaire",
                    status: "Active",
                    progress: 40,
                },
            ],
            completed: [],
        },
        exploration: {
            locationsDiscovered: 15,
            dungeonsExplored: 3,
            citiesVisited: 6,
        },
        xp: {
            current: 800,
            total: 14000,
        },
        sessionsPlayed: 8,
    },
    caelum: {
        id: "caelum",
        name: "Caelum",
        class: "Druide",
        level: 5,
        race: "Demi-Elfe",
        avatar: "",
        stats: {
            hp: { current: 68, max: 72 },
            ac: 14,
            proficiencyBonus: 3,
            weaponDamage: "1d6+3",
            strength: 8,
            dexterity: 16,
            constitution: 14,
            intelligence: 12,
            wisdom: 15,
            charisma: 11,
        },
        inventory: {
            gold: 220,
            weight: { current: 45, max: 60 },
            equippedItems: 8,
            maxEquipped: 12,
            items: [],
        },
        quests: {
            active: [
                {
                    id: "3",
                    title: "Piste du Loup Noir",
                    description: "Traquer la bête légendaire qui terrorise la région",
                    status: "Active",
                    progress: 75,
                },
            ],
            completed: [],
        },
        exploration: {
            locationsDiscovered: 4,
            dungeonsExplored: 4,
            citiesVisited: 3,
        },
        xp: {
            current: 800,
            total: 14000,
        },
        sessionsPlayed: 9,
    },
    naia: {
        id: "naia",
        name: "Naia",
        class: "Clerc",
        level: 6,
        race: "Halfeline",
        avatar: "",
        stats: {
            hp: { current: 55, max: 58 },
            ac: 16,
            proficiencyBonus: 3,
            weaponDamage: "1d8+2",
            strength: 10,
            dexterity: 12,
            constitution: 15,
            intelligence: 13,
            wisdom: 17,
            charisma: 14,
        },
        inventory: {
            gold: 195,
            weight: { current: 35, max: 50 },
            equippedItems: 7,
            maxEquipped: 10,
            items: [],
        },
        quests: {
            active: [
                {
                    id: "4",
                    title: "Bénédiction Divine",
                    description: "Purifier le temple corrompu par les forces obscures",
                    status: "Active",
                    progress: 30,
                },
            ],
            completed: [],
        },
        exploration: {
            locationsDiscovered: 18,
            dungeonsExplored: 3,
            citiesVisited: 5,
        },
        xp: {
            current: 600,
            total: 14000,
        },
        sessionsPlayed: 8,
    },
    elara: {
        id: "elara",
        name: "Elara",
        class: "Rôdeuse",
        level: 6,
        race: "Elfe",
        avatar: "",
        stats: {
            hp: { current: 78, max: 85 },
            ac: 15,
            proficiencyBonus: 4,
            weaponDamage: "1d8+3",
            strength: 12,
            dexterity: 17,
            constitution: 14,
            intelligence: 13,
            wisdom: 15,
            charisma: 11,
        },
        inventory: {
            gold: 247,
            weight: { current: 25, max: 65 },
            equippedItems: 8,
            maxEquipped: 12,
            items: [],
        },
        quests: {
            active: [
                {
                    id: "5",
                    title: "Les Cieux Perdus",
                    description: "Retrouver les cristaux célestes perdus",
                    status: "Active",
                    progress: 40,
                },
            ],
            completed: [],
        },
        exploration: {
            locationsDiscovered: 13,
            dungeonsExplored: 3,
            citiesVisited: 4,
        },
        xp: {
            current: 160,
            total: 14000,
        },
        sessionsPlayed: 8,
    },
};

// Define context types
interface CharacterContextType {
    characters: Record<string, Character>;
    selectedCharacterId: string | null;
    selectedCharacter: Character | null;
    setSelectedCharacterId: (id: string | null) => void;
    getAllCharacters: () => Character[];
    getCharacterById: (id: string) => Character | null;
    updateCharacter: (id: string, updated: Partial<Character>) => void;
}

// Create context
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
    const [characters, setCharacters] = useState<Record<string, Character>>(() => {
        try {
            const stored = localStorage.getItem("characters");
            return stored ? JSON.parse(stored) : defaultCharacterData;
        } catch (e) {
            return defaultCharacterData;
        }
    });

    const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

    // persist characters to localStorage
    useEffect(() => {
        localStorage.setItem("characters", JSON.stringify(characters));
    }, [characters]);

    const selectedCharacter = selectedCharacterId ? characters[selectedCharacterId] || null : null;

    const getAllCharacters = () => Object.values(characters);

    const getCharacterById = (id: string) => characters[id] || null;

    const updateCharacter = (id: string, updated: Partial<Character>) => {
        setCharacters((prev) => {
            const existing = prev[id];
            if (!existing) return prev;
            // Deep merge nested objects
            const merged: Character = {
                ...existing,
                ...updated,
                stats: {
                    ...existing.stats,
                    ...(updated.stats || {}),
                },
                inventory: {
                    ...existing.inventory,
                    ...(updated.inventory || {}),
                },
                quests: {
                    active: updated.quests?.active || existing.quests.active,
                    completed: updated.quests?.completed || existing.quests.completed,
                },
                exploration: {
                    ...existing.exploration,
                    ...(updated.exploration || {}),
                },
                xp: {
                    ...existing.xp,
                    ...(updated.xp || {}),
                },
            };
            return { ...prev, [id]: merged };
        });
    };

    return (
        <CharacterContext.Provider value={{ characters, selectedCharacterId, selectedCharacter, setSelectedCharacterId, getAllCharacters, getCharacterById, updateCharacter }}>
            {children}
        </CharacterContext.Provider>
    );
};

// Hook to use character context
export const useCharacter = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error("useCharacter must be used within a CharacterProvider");
    }
    return context;
};
