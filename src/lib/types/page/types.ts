import type { SuperValidated } from "sveltekit-superforms";
import type { SchemaCreateCharacter, SchemaCreateRoom, SchemaSaveCharacter } from "$lib/schemas";
import type { Character, Room } from "../entities/types";

export interface PageCreateCharacter {
    createCharacterForm: SuperValidated<SchemaCreateCharacter>,
    saveCharacterForm: SuperValidated<SchemaSaveCharacter>,
    character: Character,
    versions: Character[]
}

export interface PageCreateRoom {
    createRoomForm: SuperValidated<SchemaCreateRoom>,
    allCharacters: Character[],
    currentCharacters: Character[],
    room: Room,
    versions: Room[]
}