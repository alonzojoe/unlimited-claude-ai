export const CLAUDE_MODELS = [
    {
        id: 'claude-sonnet-4-5' as const,
        name: 'Claude Sonnet 4.5',
        description: 'Most intelligent, best for complex tasks',
    },
    {
        id: 'claude-sonnet-4' as const,
        name: 'Claude Sonnet 4',
        description: 'Balanced performance and speed',
    },
    {
        id: 'claude-opus-4' as const,
        name: 'Claude Opus 4',
        description: 'Advanced reasoning capabilities',
    },
    {
        id: 'claude-haiku-4' as const,
        name: 'Claude Haiku 4',
        description: 'Fast and efficient',
    },
] as const;