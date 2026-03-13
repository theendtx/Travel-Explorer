import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import { Container } from "../Container/Container"

export function Layout() {
  return (
    <>
      <Header />

      <Container>
        <Outlet />
      </Container>

      <Footer />
    </>
  )
}