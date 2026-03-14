type Props = {
    value: string;
    onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
    return (
        <input
            type="text"
            placeholder="Search country..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
                padding: '10px',
                width: '300px',
                marginBottom: '20px',
            }}
        />
    );
}