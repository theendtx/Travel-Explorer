import { useState } from "react"
import type { Trip } from "../types/trip"

type Props = {
  trips: Trip[]
  addTrip: (trip: Omit<Trip, "id">) => void
  deleteTrip: (id: string) => void
  updateTrip: (trip: Trip) => void
}

export function TripsPage({
  trips,
  addTrip,
  deleteTrip,
  updateTrip
}: Props) {

  const [name, setName] = useState("")
  const [country, setCountry] = useState("")

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editCountry, setEditCountry] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !country) return

    addTrip({ name, country })

    setName("")
    setCountry("")
  }

  function startEdit(trip: Trip) {
    setEditingId(trip.id)
    setEditName(trip.name)
    setEditCountry(trip.country)
  }

  function saveEdit() {
    if (!editingId) return
    console.log("SAVE CLICK")

    updateTrip({
      id: editingId,
      name: editName,
      country: editCountry
    })

    setEditingId(null)
  }

  return (
    <div>

      <h1>Trips ✈️</h1>

      {/* FORM */}
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

      {/* LIST */}
      <h2>Your Trips</h2>

      {trips.length === 0 && <p>No trips yet</p>}

      <ul>

        {trips.map((trip) => (

          <li key={trip.id} style={{ marginBottom: "10px" }}>

            {editingId === trip.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <input
                  value={editCountry}
                  onChange={(e) => setEditCountry(e.target.value)}
                />

                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                {trip.name} — {trip.country}

                <button onClick={() => startEdit(trip)}>
                  Edit
                </button>

                <button onClick={() => deleteTrip(trip.id)}>
                  Delete
                </button>
              </>
            )}

          </li>

        ))}

      </ul>

    </div>
  )
}