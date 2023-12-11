export interface CharacterData {
    output: {
        answer: string
    }
}

export interface Character {
    id?: string,
    charId?: string,
    userId?: number,
    name: string,
    age: number,
    backStory: string,
    dateTime?: string
}

export interface RemainingTime {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}