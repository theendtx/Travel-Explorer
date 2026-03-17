import { useState } from "react"
import type { Trip } from "../types/trip"

type Props = {
  trips: Trip[]
  addTrip: (trip: Omit<Trip, "id">) => void
}

export function TripsPage({ trips, addTrip }: Props) {

  const [name, setName] = useState("")
  const [country, setCountry] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !country) return

    addTrip({ name, country })

    setName("")
    setCountry("")
  }

  return (
    <div>

      <h1>Create Trip ✈️</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Trip name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button type="submit">Add Trip</button>

      </form>

      <h2>Your Trips</h2>

      {trips.length === 0 && <p>No trips yet</p>}

      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            {trip.name} — {trip.country}
          </li>
        ))}
      </ul>

    </div>
  )
}