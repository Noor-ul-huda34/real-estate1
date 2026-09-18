import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const [buyOpen, setBuyOpen] = useState(false);
  const [rentOpen, setRentOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    setBuyOpen(false);
    setRentOpen(false);
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="otm-header">

      {/* LOGO */}
      <Link to="/" className="estate-logo">
        <span className="logo-symbol">✓</span>
        <span>EstateHub</span>
      </Link>

      {/* CENTER NAVIGATION */}
      <nav className="main-navigation">

        {/* BUY */}
        <div className="nav-dropdown">
          <button
            className="nav-link"
            onClick={() => {
              setBuyOpen(!buyOpen);
              setRentOpen(false);
            }}
          >
            <span>Buy</span>
            <ChevronDown size={15} />
          </button>

          {buyOpen && (
            <div className="nav-dropdown-menu">

              <button
                onClick={() =>
                  handleNavigate("/properties?type=buy")
                }
              >
                All Properties
              </button>

              <button
                onClick={() =>
                  handleNavigate(
                    "/properties?type=buy&property=house"
                  )
                }
              >
                Houses
              </button>

              <button
                onClick={() =>
                  handleNavigate(
                    "/properties?type=buy&property=apartment"
                  )
                }
              >
                Apartments
              </button>

            </div>
          )}
        </div>

        {/* RENT */}
        <div className="nav-dropdown">
          <button
            className="nav-link"
            onClick={() => {
              setRentOpen(!rentOpen);
              setBuyOpen(false);
            }}
          >
            <span>Rent</span>
            <ChevronDown size={15} />
          </button>

          {rentOpen && (
            <div className="nav-dropdown-menu">

              <button
                onClick={() =>
                  handleNavigate("/properties?type=rent")
                }
              >
                All Rentals
              </button>

              <button
                onClick={() =>
                  handleNavigate(
                    "/properties?type=rent&property=house"
                  )
                }
              >
                Houses
              </button>

              <button
                onClick={() =>
                  handleNavigate(
                    "/properties?type=rent&property=apartment"
                  )
                }
              >
                Apartments
              </button>

            </div>
          )}
        </div>

        {/* FIND AN AGENT */}
        <button
          className="nav-link agent-nav-link"
          onClick={() =>
            handleNavigate("/agents")
          }
        >
          Find an Agent
        </button>

      </nav>

      {/* RIGHT SIDE */}
      <div className="header-right">

        {/* SAVED PROPERTIES */}
        <button
          className="header-heart"
          onClick={() =>
            handleNavigate("/saved")
          }
          aria-label="Saved properties"
        >
          <Heart size={21} />
        </button>

        {/* SIGN IN / REGISTER */}
        <Link
          to="/signin"
          className="signin-button"
        >
          Sign in/Register
        </Link>

        {/* MOBILE MENU */}
        <button
          className="mobile-menu-button"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            setBuyOpen(false);
            setRentOpen(false);
          }}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

      </div>

      {/* MOBILE NAVIGATION */}
      {mobileMenuOpen && (
        <div className="mobile-navigation">

          <button
            onClick={() =>
              handleNavigate("/properties?type=buy")
            }
          >
            Buy
          </button>

          <button
            onClick={() =>
              handleNavigate("/properties?type=rent")
            }
          >
            Rent
          </button>

          <button
            onClick={() =>
              handleNavigate("/agents")
            }
          >
            Find an Agent
          </button>

          <button
            onClick={() =>
              handleNavigate("/saved")
            }
          >
            Saved Properties
          </button>

          <button
            onClick={() =>
              handleNavigate("/signin")
            }
          >
            Sign in / Register
          </button>

        </div>
      )}

    </header>
  );
}

export default Navbar;

