import { useEffect, useState } from "react"
import type { Country } from "../types/country"
import { getAllCountries } from "../services/countriesApi"
import { CountryList } from "../components/Container/CountryList/CountryList"

export function ExplorePage() {
  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    async function loadCountries() {
      const data = await getAllCountries()

      console.log(data)

      setCountries(data)
    }

    loadCountries()
  }, [])

  return (
    <div>
      <h1>Explore Countries</h1>

      <CountryList countries={countries} />
    </div>
  )
}