import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  X,
  Heart,
  UserRound,
  LogOut,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("estatehub_user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("estatehub_user");
    setUser(null);
    setUserMenuOpen(false);
    navigate("/");
  };

  const handleMenuLink = (path) => {
    setMenuOpen(false);
    setUserMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="otm-header">

      {/* LEFT */}
      <button
        className="agent-link"
        onClick={() =>
          handleMenuLink("/agents")
        }
      >
        Find an agent
      </button>

      {/* LOGO */}
      <Link to="/" className="estate-logo">
        <span className="logo-symbol">✓</span>
        EstateHub
      </Link>

      {/* RIGHT */}
      <div className="header-right">

        {/* SAVED */}
        <button
          className="header-heart"
          onClick={() =>
            handleMenuLink("/saved")
          }
          aria-label="Saved properties"
        >
          <Heart size={20} />
        </button>

        {/* USER / SIGN IN */}
        {user ? (
          <div className="user-area">

            <button
              className="user-button"
              onClick={() =>
                setUserMenuOpen(!userMenuOpen)
              }
            >
              <UserRound size={18} />

              <span>
                {user.name}
              </span>
            </button>

            {userMenuOpen && (
              <div className="user-dropdown">

                <button
                  onClick={() =>
                    handleMenuLink("/saved")
                  }
                >
                  <Heart size={17} />
                  Saved properties
                </button>

                <button
                  onClick={handleLogout}
                >
                  <LogOut size={17} />
                  Logout
                </button>

              </div>
            )}

          </div>
        ) : (
          <Link
            to="/signin"
            className="signin-button"
          >
            Sign in/Register
          </Link>
        )}

        {/* MENU */}
        <button
          className="menu-button"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setUserMenuOpen(false);
          }}
          aria-label="Menu"
        >
          {menuOpen ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}
        </button>

      </div>

      {/* MAIN MENU */}
      {menuOpen && (
        <div className="header-menu">

          <button
            onClick={() =>
              handleMenuLink(
                "/properties?type=buy"
              )
            }
          >
            Buy
          </button>

          <button
            onClick={() =>
              handleMenuLink(
                "/properties?type=rent"
              )
            }
          >
            Rent
          </button>

          <button
            onClick={() =>
              handleMenuLink("/properties")
            }
          >
            Properties
          </button>

          <button
            onClick={() =>
              handleMenuLink("/agents")
            }
          >
            Find an Agent
          </button>

          <button
            onClick={() =>
              handleMenuLink("/saved")
            }
          >
            Saved Properties
          </button>

          {!user && (
            <button
              className="menu-signin"
              onClick={() =>
                handleMenuLink("/signin")
              }
            >
              Sign in / Register
            </button>
          )}

          {user && (
            <button
              className="menu-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>
      )}

    </header>
  );
}

export default Navbar;