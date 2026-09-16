import { describe, it, expect } from 'vitest';
import { parseConversionInput } from './parseInput';

describe('parseConversionInput', () => {
    it('parses valid input', () => {
        expect(parseConversionInput('15 usd in rub')).toEqual({
            amount: 15, from: 'USD', to: 'RUB'
        });
    });

    it('returns null for invalid input', () => {
        expect(parseConversionInput('hello world')).toBeNull();
    });

    it('handles decimals and case insensitivity', () => {
        expect(parseConversionInput('2.5 eur in RUB')).toEqual({
            amount: 2.5, from: 'EUR', to: 'RUB'
        });
    });
});