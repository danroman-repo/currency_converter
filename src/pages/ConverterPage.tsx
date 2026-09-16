import { ConverterForm } from '../components/ConverterForm';

export function ConverterPage() {
    return (
        <div className="container page">
            <header className="page-header">
                <h1>Конвертер валют</h1>
                <p className="page-subtitle">
                    Введите сумму и валюты в свободной форме — мы посчитаем по курсу ЦБ РФ.
                </p>
            </header>
            <ConverterForm />
        </div>
    );
}