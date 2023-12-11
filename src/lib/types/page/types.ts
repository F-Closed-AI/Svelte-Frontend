import type { SuperValidated } from "sveltekit-superforms";
import type { SchemaCreateCharacter, SchemaSaveCharacter } from "$lib/schemas";
import type { Character } from "../entities/types";

export interface PageCreate {
    createCharacterForm: SuperValidated<SchemaCreateCharacter>,
    saveCharacterForm: SuperValidated<SchemaSaveCharacter>,
    character: Character,
    versions: Character[]
}