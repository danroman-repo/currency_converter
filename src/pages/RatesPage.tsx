import { useEffect, useMemo, useState } from 'react';
import { fetchRates } from '../services/cbrService';
import { useBaseCurrency } from '../hooks/useBaseCurrency';
import { RatesTable } from '../components/RatesTable';
import { SkeletonTable } from '../components/SkeletonTable';
import { BaseCurrencySelect } from '../components/BaseCurrencySelect';

interface Row {
    charCode: string;
    name: string;
    rate: number;
}

const POPULAR = ['RUB', 'USD', 'EUR', 'GBP', 'CNY', 'JPY', 'CHF', 'KZT', 'TRY'];

export function RatesPage() {
    const { baseCurrency, setBaseCurrency } = useBaseCurrency();
    const [allRates, setAllRates] = useState<Record<string, number>>({});
    const [names, setNames] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatedAt, setUpdatedAt] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetchRates()
            .then((data) => {
                if (cancelled) return;
                const rates: Record<string, number> = { RUB: 1 };
                const nameMap: Record<string, string> = { RUB: 'Российский рубль' };
                Object.values(data.Valute).forEach((v) => {
                    rates[v.CharCode] = v.Value / v.Nominal;
                    nameMap[v.CharCode] = v.Name;
                });
                setAllRates(rates);
                setNames(nameMap);
                setUpdatedAt(new Date(data.Timestamp).toLocaleString('ru-RU'));
                setError(null);
            })
            .catch((e) => {
                if (cancelled) return;
                setError(e instanceof Error ? e.message : 'Не удалось загрузить курсы');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    const rows = useMemo<Row[]>(() => {
        const baseToRub = allRates[baseCurrency] ?? 1;
        return Object.entries(allRates)
            .filter(([code]) => code !== baseCurrency)
            .map(([code, toRub]) => ({
                charCode: code,
                name: names[code] ?? code,
                rate: baseToRub / toRub,
            }))
            .sort((a, b) => {
                const ia = POPULAR.indexOf(a.charCode);
                const ib = POPULAR.indexOf(b.charCode);
                if (ia !== -1 && ib !== -1) return ia - ib;
                if (ia !== -1) return -1;
                if (ib !== -1) return 1;
                return a.charCode.localeCompare(b.charCode);
            });
    }, [allRates, names, baseCurrency]);

    const availableCodes = useMemo(() => {
        const codes = Object.keys(allRates);
        return codes.sort((a, b) => {
            const ia = POPULAR.indexOf(a);
            const ib = POPULAR.indexOf(b);
            if (ia !== -1 && ib !== -1) return ia - ib;
            if (ia !== -1) return -1;
            if (ib !== -1) return 1;
            return a.localeCompare(b);
        });
    }, [allRates]);

    return (
        <div className="container page">
            <header className="page-header">
                <h1>Курсы валют</h1>
                <p className="page-subtitle">
                    {updatedAt ? `Актуально на ${updatedAt}` : 'Данные ЦБ РФ'}
                </p>
            </header>

            <div className="card">
                <div className="rates-header">
                    <h2>Относительно базовой валюты</h2>
                    <BaseCurrencySelect
                        value={baseCurrency}
                        options={availableCodes}
                        onChange={setBaseCurrency}
                    />
                </div>

                {error && (
                    <div className="error" role="alert">
                        {error}
                    </div>
                )}

                {loading ? <SkeletonTable /> : <RatesTable base={baseCurrency} rows={rows} />}
            </div>
        </div>
    );
}