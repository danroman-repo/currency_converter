export function formatRate(value: number, base: string): string {
    if (!Number.isFinite(value)) return '—';

    // Очень маленькие курсы — показываем больше знаков
    const abs = Math.abs(value);
    let digits = 2;
    if (abs < 1) digits = 4;
    if (abs < 0.01) digits = 6;

    return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(value);
}

export function formatAmount(value: number): string {
    return new Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: 2,
    }).format(value);
}