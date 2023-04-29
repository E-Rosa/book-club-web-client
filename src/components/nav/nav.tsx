import { FunctionComponent } from "react";
import logo from "../../assets/book-club-web-logo-horizontal.png";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface NavProps {}

const Nav: FunctionComponent<NavProps> = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="Nav">
        <div className="Nav-first-items-container">
          <img src={logo} alt="logo" className="Nav-logo"></img>
          <button
            type="button"
            className="s-border s-shadow pastel-red s-padding-top m-padding sides"
            onClick={() => {
               navigate("/home")
            }}
          >
            votar
          </button>
          <Link to="/books/post">
            <button
              type="button"
              className="s-border s-shadow s-padding-top m-padding sides"
            >
              sugerir
            </button>
          </Link>
        </div>

        <div className="logout-button-container">
          <button
            type="button"
            className="Nav-logout-button s-border s-shadow s-padding-top bright-yellow m-padding sides"
            onClick={() => {
              window.sessionStorage.removeItem("user");
              window.sessionStorage.removeItem("jwt");
              navigate("/")
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
