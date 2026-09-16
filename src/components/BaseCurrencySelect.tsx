interface Props {
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

export function BaseCurrencySelect({ value, options, onChange }: Props) {
    return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            <span className="hint">Базовая валюта:</span>
            <select
                className="select"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((code) => (
                    <option key={code} value={code}>{code}</option>
                ))}
            </select>
        </label>
    );
}