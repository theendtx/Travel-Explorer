import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout/Layout"

import { HomePage } from "./pages/HomePage"
import { ExplorePage } from "./pages/ExplorePage"
import { FavoritesPage } from "./pages/FavoritesPage"
import { TripsPage } from "./pages/TripsPage"
import { CountryPage } from "./pages/CountryPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route element={<Layout />}>

    <Route path="/" element={<HomePage />} />
    <Route path="/explore" element={<ExplorePage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="/trips" element={<TripsPage />} />

    <Route path="/country/:name" element={<CountryPage />} />

  </Route>
</Routes>
    </BrowserRouter>
  )
}

export default App