import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import { Layout } from "./components/Layout/Layout"

import { HomePage } from "./pages/HomePage"
import { ExplorePage } from "./pages/ExplorePage"
import { FavoritesPage } from "./pages/FavoritesPage"
import { TripsPage } from "./pages/TripsPage"
import { CountryPage } from "./pages/CountryPage"

function App() {

  const [favorites, setFavorites] = useState<string[]>([])

  function toggleFavorite(name: string) {
    setFavorites((prev) => {
      if (prev.includes(name)) {
        return prev.filter((c) => c !== name)
      }

      return [...prev, name]
    })
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
            element={<CountryPage />}
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

          <Route path="/trips" element={<TripsPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
