export interface ParsedConversion {
    amount: number;
    from: string;
    to: string;
}

const PATTERN = /^(\d+(?:\.\d+)?)\s+([a-zA-Z]{3})\s+in\s+([a-zA-Z]{3})$/i;

export function parseConversionInput(input: string): ParsedConversion | null {
    const match = input.trim().match(PATTERN);
    if (!match) return null;

    return {
        amount: parseFloat(match[1]),
        from: match[2].toUpperCase(),
        to: match[3].toUpperCase(),
    };
}