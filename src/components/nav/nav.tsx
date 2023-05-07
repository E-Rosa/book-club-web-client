import { FunctionComponent } from "react";
import logo from "../../assets/book-club-web-logo-horizontal.png";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface NavProps {}

const Nav: FunctionComponent<NavProps> = () => {
  const isBooksPage = window.location.href.includes("/books");
  const isMeetingsPage = window.location.href.includes("/meetings");
  const isAdminPage = window.location.href.includes("/admin");
  const user = JSON.parse(window.sessionStorage.getItem("user") as string);
  const navigate = useNavigate();
  return (
    <>
      <div className="Nav">
        <div className="Nav-first-items-container">
          <img src={logo} alt="logo" className="Nav-logo"></img>
          <button
            type="button"
            className={isBooksPage ? "red-button" : "white-button"}
            onClick={() => {
              navigate("/books");
            }}
          >
            livros
          </button>
          <Link to="/meetings">
            <button
              type="button"
              className={isMeetingsPage ? "red-button" : "white-button"}
            >
              reuniões
            </button>
          </Link>
          {user.isAdmin && (
            <Link to="/admin">
              <button
                type="button"
                className={isAdminPage ? "red-button" : "white-button"}
              >
                admin
              </button>
            </Link>
          )}
        </div>

        <div className="logout-button-container">
          <button
            type="button"
            className="bright-yellow-button Nav-logout-button"
            onClick={() => {
              window.sessionStorage.removeItem("user");
              window.sessionStorage.removeItem("jwt");
              navigate("/");
            }}
          >
            sair
          </button>
        </div>
      </div>
    </>
  );
};

export default Nav;
