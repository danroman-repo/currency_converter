export function SkeletonTable({ rows = 8 }: { rows?: number }) {
    return (
        <table className="rates-table" aria-busy="true">
            <thead>
                <tr>
                    <th>Валюта</th>
                    <th>Курс</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: rows }).map((_, i) => (
                    <tr key={i}>
                        <td><div className="skeleton" style={{ width: 100, height: 16 }} /></td>
                        <td style={{ textAlign: 'right' }}>
                            <div className="skeleton" style={{ width: 80, height: 16, marginLeft: 'auto' }} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}