import { useEffect, useState } from "react"
import type { Country } from "../types/country"
import  { getAllCountries } from "../services/countriesApi"
import { CountryList } from "../components/Container/CountryList/CountryList"
import { SearchBar } from "../components/SearchBar/SearchBar"
import { RegionFilter } from "../components/RegionFilter/RegionFilter"
import { PopulationFilter } from "../components/PopulationFilter/PopulationFilter"

type Props = {
  favorites: string[]
  toggleFavorite: (name: string) => void
}

export function ExplorePage({ favorites, toggleFavorite }: Props) {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [debouncedQuery, setDebouncedQuery] = useState<string>("")
  const [region, setRegion] = useState<string>("")
  const [populationSort, setPopulationSort] = useState<string>("")

  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await getAllCountries()
        setCountries(data)
      } catch {
        setError("Failed to load countries")
      } finally {
        setLoading(false)
      }
    }

    loadCountries()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 350)

    return () => clearTimeout(timer)
  }, [searchQuery])

  let filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  if (region) {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === region
    )
  }

  if (populationSort === "asc") {
    filteredCountries = [...filteredCountries].sort(
      (a, b) => a.population - b.population
    )
  }

  if (populationSort === "desc") {
    filteredCountries = [...filteredCountries].sort(
      (a, b) => b.population - a.population
    )
  }

  if (loading) return <div className="status-message">Loading countries...</div>
  if (error) return <div className="status-message">{error}</div>

  return (
    <div className="page">
      <section className="page-heading">
        <span className="eyebrow">Block 16</span>
        <h1>Explore countries with a layout that scales beautifully.</h1>
        <p>
          Search fast, filter by region, sort population, and keep favorite places
          close while the grid stays balanced across devices.
        </p>
      </section>

      <section className="filters-bar">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <RegionFilter value={region} onChange={setRegion} />
        <PopulationFilter value={populationSort} onChange={setPopulationSort} />
      </section>

      <CountryList
        countries={filteredCountries}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  )
}
