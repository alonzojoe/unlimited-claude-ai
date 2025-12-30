export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export interface Chat {
    id: string;
    title: string;
    preview: string;
    messages: Message[];
    model?: string;
}

export type ClaudeModel =
    | 'claude-sonnet-4-5'
    | 'claude-sonnet-4'
    | 'claude-opus-4'
    | 'claude-haiku-4';


export type Theme = 'light' | 'dark'