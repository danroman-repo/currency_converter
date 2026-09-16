import { formatRate } from '../utils/formatNumber';

interface Row {
    charCode: string;
    name: string;
    rate: number;
    previous?: number;
}

interface Props {
    base: string;
    rows: Row[];
}

export function RatesTable({ base, rows }: Props) {
    return (
        <table className="rates-table">
            <thead>
                <tr>
                    <th>Валюта</th>
                    <th>Курс (1 = {base})</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.charCode}>
                        <td>
                            <span className="currency-code">{row.charCode}</span>
                            <span className="currency-name">{row.name}</span>
                        </td>
                        <td className="rate-value">{formatRate(row.rate, base)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}