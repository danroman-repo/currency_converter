interface CBRValute {
    ID: string;
    NumCode: string;
    CharCode: string;
    Nominal: number;
    Name: string;
    Value: number;
    Previous: number;
}

interface CBRResponse {
    Date: string;
    Timestamp: string;
    Valute: Record<string, CBRValute>;
}

// In-memory cache to avoid refetching
let cachedData: CBRResponse | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export async function fetchRates(): Promise<CBRResponse> {
    const now = Date.now();
    if (cachedData && now - cacheTimestamp < CACHE_TTL) {
        return cachedData;
    }

    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    if (!response.ok) throw new Error('Failed to fetch rates');

    const data: CBRResponse = await response.json();
    cachedData = data;
    cacheTimestamp = now;
    return data;
}

// Normalize: convert everything to rubles per unit
export function getRateToRub(data: CBRResponse, charCode: string): number {
    if (charCode === 'RUB') return 1;
    const valute = Object.values(data.Valute).find(v => v.CharCode === charCode);
    if (!valute) throw new Error(`Currency ${charCode} not found`);
    return valute.Value / valute.Nominal;
}