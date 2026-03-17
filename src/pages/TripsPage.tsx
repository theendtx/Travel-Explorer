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
  const [notes, setNotes] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editCountry, setEditCountry] = useState("")
  const [editNotes, setEditNotes] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name || !country) return

    addTrip({ name, country, notes })
    setName("")
    setCountry("")
    setNotes("")
  }

  function startEdit(trip: Trip) {
    setEditingId(trip.id)
    setEditName(trip.name)
    setEditCountry(trip.country)
    setEditNotes(trip.notes ?? "")
  }

  function saveEdit() {
    if (!editingId) return

    updateTrip({
      id: editingId,
      name: editName,
      country: editCountry,
      notes: editNotes
    })

    setEditingId(null)
  }

  return (
    <div className="page">
      <section className="page-heading">
        <span className="eyebrow">Planner Studio</span>
        <h1>Shape trips with a cleaner planning workflow.</h1>
        <p>
          Add destination ideas, store notes, and keep an editable travel board
          ready for quick changes.
        </p>
      </section>

      <section className="trip-overview-grid">
        <article className="feature-card">
          <strong>{trips.length}</strong>
          <p className="section-copy">planned routes currently saved</p>
        </article>

        <article className="feature-card">
          <strong>Responsive</strong>
          <p className="section-copy">form and trip list stack smoothly on smaller screens</p>
        </article>

        <article className="feature-card">
          <strong>Animated</strong>
          <p className="section-copy">interactive actions feel more modern and polished</p>
        </article>
      </section>

      <section className="trips-layout">
        <div className="form-card">
          <h2>Create a trip</h2>
          <p className="section-copy">
            Save a route idea with destination and short note.
          </p>

          <form className="trip-form" onSubmit={handleSubmit}>
            <input
              className="trip-input"
              type="text"
              placeholder="Trip name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="trip-input"
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <textarea
              className="trip-textarea"
              placeholder="Notes, dates, must-see places..."
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button className="trip-action primary" type="submit">
              Add trip
            </button>
          </form>
        </div>

        <div className="list-card">
          <h2>Your trips</h2>
          <p className="section-copy">Edit plans without leaving the page.</p>

          {trips.length === 0 ? (
            <div className="empty-state">
              <h3>No trips yet</h3>
              <p>Add your first route and start building your itinerary.</p>
            </div>
          ) : (
            <div className="trip-list">
              {trips.map((trip) => (
                <article className="trip-card" key={trip.id}>
                  {editingId === trip.id ? (
                    <>
                      <input
                        className="trip-input"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />

                      <input
                        className="trip-input"
                        value={editCountry}
                        onChange={(e) => setEditCountry(e.target.value)}
                      />

                      <textarea
                        className="trip-textarea"
                        rows={4}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                      />

                      <div className="trip-card__actions">
                        <button className="trip-action primary" onClick={saveEdit}>
                          Save changes
                        </button>
                        <button
                          className="trip-action ghost"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="trip-card__head">
                        <div>
                          <h3>{trip.name}</h3>
                          <p className="trip-card__meta">{trip.country}</p>
                        </div>
                      </div>

                      {trip.notes ? <p className="section-copy">{trip.notes}</p> : null}

                      <div className="trip-card__actions">
                        <button
                          className="trip-action secondary"
                          onClick={() => startEdit(trip)}
                        >
                          Edit
                        </button>
                        <button
                          className="trip-action ghost"
                          onClick={() => deleteTrip(trip.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
