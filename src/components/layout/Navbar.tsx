import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  function handleLogout(): void {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar__content">
        <Link to="/books" className="navbar__brand">
          Online Bookstore
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Books
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "navbar__link navbar__link--active"
                    : "navbar__link"
                }
              >
                Cart
              </NavLink>

              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "navbar__link navbar__link--active"
                    : "navbar__link"
                }
              >
                Orders
              </NavLink>
            </>
          )}
        </nav>

        <div className="navbar__actions">
          {isAuthenticated && user ? (
            <>
              <span className="navbar__user">
                {user.firstName} {user.lastName}
              </span>

              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__button-link">
                Login
              </Link>

              <Link to="/register" className="navbar__button-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}