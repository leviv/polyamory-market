import { Link } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link to="/">
            <p className="logo">PolyamoryMarket</p>
          </Link>
          <div className="nav-link-container">
            <Link to="/">
              <p className="nav-link">Markets</p>
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ position: "relative", width: 400 }}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Trade on anything"
              className="nav-search"
            />
            <div
              className="foo"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 8,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="pl-1.5 md:hidden">
                <div
                  className="size-[20px]"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                      fill="var(--text-x30)"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <button className="about-button">
            <a href="https://tisch.nyu.edu/itp/events/fall-20251/itp-ima-stupid-hackathon-2026" target="_blank">
              About
            </a>
          </button>
        </div>
      </nav>
    </div>
  );
};
