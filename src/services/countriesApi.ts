import type { Country } from "../types/country"

const BASE_URL = "https://restcountries.com/v3.1"

export async function getAllCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/all`)

    if (!response.ok) {
      throw new Error("Failed to fetch countries")
    }

    const data: Country[] = await response.json()

    return data
  } catch (error) {
    console.error("Error fetching countries:", error)
    throw error
  }
}

export async function getCountryByName(name: string): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}`)

    if (!response.ok) {
      throw new Error("Country not found")
    }

    const data: Country[] = await response.json()

    return data
  } catch (error) {
    console.error("Error fetching country:", error)
    throw error
  }
}