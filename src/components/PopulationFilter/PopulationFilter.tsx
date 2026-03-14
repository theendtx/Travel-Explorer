type Props = {
  value: string
  onChange: (value: string) => void
}

export function PopulationFilter({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "10px" }}
    >
      <option value="">Sort by population</option>
      <option value="asc">Lowest first</option>
      <option value="desc">Highest first</option>
    </select>
  )
}

export default PopulationFilter