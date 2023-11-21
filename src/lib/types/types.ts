export interface CharacterData {
    output: {
        answer: string
    }
}

export interface Character {
    id?: string,
    userId?: number,
    name: string,
    age: number,
    backStory: string
}