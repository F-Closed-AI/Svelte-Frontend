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
    labelId?: string[],
    dateTime?: string
}

export interface Label {
    id?: string,
    userId: number,
    name: string,
    color: string
}

export interface Conversation {
    id?: string,
    subject: string,
    conversationPhrases: ConversationPhrase[]
}

export interface ConversationPhrase {
    name: string,
    content: string
}

export interface RemainingTime {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}