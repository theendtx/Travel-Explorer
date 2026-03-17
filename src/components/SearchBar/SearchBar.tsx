type Props = {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search country, culture or dream destination..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
