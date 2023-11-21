import type { CharacterData, Character } from "$lib/types/types";

export default function convertCharacter(character: CharacterData)  {
    const regex = /Name:\s*(.*?)\s*Age:\s*(.*?)\s*Backstory:\s*(.*)/i;
    const matches = character.output.answer.match(regex);

    if(!matches) {
        throw new Error("Response format is not as expected");
    }

    const [, name, age, backStory] = matches;

    const newCharacter: Character =  {
        name: name,
        age: age,
        backStory: backStory
    };

    return newCharacter;
}