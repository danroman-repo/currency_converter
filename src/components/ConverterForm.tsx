import { useState, useCallback, useRef } from 'react';
import { parseConversionInput } from '../utils/parseInput';
import { fetchRates, getRateToRub } from '../services/cbrService';
import { formatAmount } from '../utils/formatNumber';
import { Spinner } from './Spinner';

interface Result {
    amount: number;
    from: string;
    to: string;
    value: number;
    rate: number;
}

export function ConverterForm() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleConvert = useCallback(async () => {
        const trimmed = input.trim();
        if (!trimmed) {
            setError('Введите запрос, например 15 usd in rub');
            return;
        }

        const parsed = parseConversionInput(trimmed);
        if (!parsed) {
            setError('Не удалось разобрать запрос. Формат: 15 usd in rub');
            setResult(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await fetchRates();
            const fromRate = getRateToRub(data, parsed.from);
            const toRate = getRateToRub(data, parsed.to);

            const amountInRub = parsed.amount * fromRate;
            const value = amountInRub / toRate;
            const rate = fromRate / toRate;

            setResult({ ...parsed, value, rate });
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Не удалось выполнить конвертацию');
            setResult(null);
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    }, [input]);

    const isValid = input.trim() === '' || parseConversionInput(input) !== null;
    const showInvalid = input.trim() !== '' && !isValid;

    return (
        <div className="card">
            <div className="converter-form">
                <input
                    ref={inputRef}
                    type="text"
                    inputMode="text"
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                    className={`converter-input${showInvalid ? ' invalid' : ''}`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
                    placeholder="15 usd in rub"
                    aria-label="Запрос на конвертацию"
                    aria-invalid={showInvalid}
                />
                <button
                    type="button"
                    className="btn-primary"
                    onClick={handleConvert}
                    disabled={loading || showInvalid}
                >
                    {loading ? <Spinner /> : 'Конвертировать'}
                </button>
            </div>

            <p className="hint">
                Формат: <code>15 usd in rub</code>, <code>100 eur in usd</code>,{' '}
                <code>1 cny in rub</code>
            </p>

            {error && (
                <div className="error" role="alert">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4M12 16h.01" />
                    </svg>
                    {error}
                </div>
            )}

            {result && !loading && (
                <div className="result" role="status">
                    <div className="result-label">
                        {formatAmount(result.amount)} {result.from} → {result.to}
                    </div>
                    <div className="result-value">
                        {formatAmount(result.value)} <span className="unit">{result.to}</span>
                    </div>
                    <div className="hint" style={{ marginTop: 'var(--sp-2)' }}>
                        1 {result.from} = {formatAmount(result.rate)} {result.to}
                    </div>
                </div>
            )}
        </div>
    );
}