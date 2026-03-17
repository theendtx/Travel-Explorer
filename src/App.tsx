import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"

import { Layout } from "./components/Layout/Layout"

import { HomePage } from "./pages/HomePage"
import { ExplorePage } from "./pages/ExplorePage"
import { FavoritesPage } from "./pages/FavoritesPage"
import { TripsPage } from "./pages/TripsPage"
import { CountryPage } from "./pages/CountryPage"

import type { Trip } from "./types/trip"

function App() {
  const [trips, setTrips] = useState<Trip[]>(() => {
  const saved = localStorage.getItem("trips")
  return saved ? JSON.parse(saved) : []
})

useEffect(() => {
  localStorage.setItem("trips", JSON.stringify(trips))
}, [trips])

  const [favorites, setFavorites] = useState<string[]>(() => {
  const saved = localStorage.getItem("favorites")
  return saved ? JSON.parse(saved) : []
})

useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites))
}, [favorites])

  function toggleFavorite(name: string) {
    setFavorites((prev) => {
      if (prev.includes(name)) {
        return prev.filter((c) => c !== name)
      }

      return [...prev, name]
    })
  }

  function addTrip(trip: Omit<Trip, "id">) {
  const newTrip: Trip = {
    id: Date.now().toString(),
    ...trip
  }

  setTrips((prev) => [...prev, newTrip])
}

  function deleteTrip(id: string) {
  setTrips((prev) => prev.filter((t) => t.id !== id))
}

 function updateTrip(updatedTrip: Trip) {
  setTrips((prev) =>
    prev.map((trip) =>
      trip.id === updatedTrip.id ? updatedTrip : trip
    )
  )
} 

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route path="/" element={<HomePage />} />

          <Route
            path="/explore"
            element={
              <ExplorePage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />

          <Route 
  path="/country/:name" 
  element={
    <CountryPage 
      favorites={favorites} 
      toggleFavorite={toggleFavorite} 
    />
  } 
/>

          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />

          <Route
  path="/trips"
  element={
    <TripsPage
      trips={trips}
      addTrip={addTrip}
      deleteTrip={deleteTrip}
      updateTrip={updateTrip}
    />
  }
/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
