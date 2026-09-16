import { useState, useEffect } from 'react';

function detectBaseCurrency(): string {
    const lang = navigator.language || 'en-US';
    if (lang.startsWith('ru')) return 'RUB';
    if (lang.startsWith('en')) return 'USD';
    return 'RUB'; // default fallback
}

export function useBaseCurrency() {
    const [baseCurrency, setBaseCurrency] = useState<string>(() => {
        return localStorage.getItem('baseCurrency') || detectBaseCurrency();
    });

    useEffect(() => {
        localStorage.setItem('baseCurrency', baseCurrency);
    }, [baseCurrency]);

    return { baseCurrency, setBaseCurrency };
}