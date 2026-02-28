import { Link } from "react-router-dom"
import './Navbar.scss'

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
          <Link to="/">
            <p className="logo">PolyamoryMarket</p>
          </Link>
        <div className="nav-link-container">
          <Link to="/">
            <p className="nav-link">Markets</p>
          </Link>
        </div>
        <input type="text" name="" id="" placeholder="Trade on anything" className="nav-search" />
      </nav>
    </div>
  )
}
