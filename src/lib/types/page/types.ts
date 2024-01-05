import type { SuperValidated } from "sveltekit-superforms";
import type { SchemaCreateCharacter, SchemaCreateConversation, SchemaCreateLabel, SchemaCreateRoom, SchemaDeleteRoom, SchemaSaveCharacter } from "$lib/schemas";
import type { Character, Label, Room } from "../entities/types";
import type { schemaDeleteCharacter } from "$lib/schemas/character/deleteCharacter";
import type { SchemaDeleteLabel } from "$lib/schemas/label/deleteLabel";

export interface PageCreateCharacter {
    createCharacterForm: SuperValidated<SchemaCreateCharacter>,
    saveCharacterForm: SuperValidated<SchemaSaveCharacter>,
    deleteCharacterForm: SuperValidated<schemaDeleteCharacter>,
    character: Character,
    versions: Character[]
}

export interface PageViewCharacter {
    character: Character
}

export interface PageCreateRoom {
    createRoomForm: SuperValidated<SchemaCreateRoom>,
    deleteRoomForm: SuperValidated<SchemaDeleteRoom>,
    allCharacters: Character[],
    currentCharacters: Character[],
    allLabels: Label[],
    currentLabels: Label[],
    room: Room,
    versions: Room[]
}

export interface PageViewRoom {
    createConversationForm: SuperValidated<SchemaCreateConversation>,
    currentCharacters: Character[],
    room: Room,
}

export interface PageCreateLabel {
    createLabelForm: SuperValidated<SchemaCreateLabel>,
    deleteLabelForm: SuperValidated<SchemaDeleteLabel>,
    label: Label
}