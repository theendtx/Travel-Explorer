import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import { Container } from "../Container/Container"

export function Layout() {
  return (
    <div className="app-shell">
      <Header />

      <main className="page-shell">
        <Container>
          <div className="page-transition">
            <Outlet />
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
