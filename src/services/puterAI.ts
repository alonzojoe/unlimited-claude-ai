import puter from '@heyputer/puter.js';

export const chatWithClaude = async (
    message: string,
    model: string,
    onStream: (text: string) => void
): Promise<void> => {
    try {
        const response = await puter.ai.chat(message, {
            model,
            stream: true,
        });

        for await (const part of response) {
            if (part?.text) {
                onStream(part.text);
            }
        }
    } catch (error) {
        console.error('Error calling Puter AI:', error);
        throw error;
    }
};