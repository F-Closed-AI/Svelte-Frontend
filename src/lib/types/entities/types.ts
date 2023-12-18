export interface CharacterData {
    output: {
        answer: string
    }
}

export interface Character {
    id?: string,
    charId?: string,
    userId?: number,
    prompt: string,
    name: string,
    age: number,
    backStory: string,
    dateTime?: string
}

export interface Room {
    id?: string,
    roomId?: string,
    name: string,
    userId: number,
    charId?: string[],
    dateTime?: string
}

export interface Label {
    name: string,
    color: string
}

export interface RemainingTime {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}