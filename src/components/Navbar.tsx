import { Link } from "react-router-dom"
import './Navbar.scss'

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="logo">PolyamoryMarket</p>
      </Link>
    </nav>
  )
}
