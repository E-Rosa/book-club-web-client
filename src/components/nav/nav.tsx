import { FunctionComponent } from "react";
import logo from "../../assets/book-club-web-logo-horizontal.png";
import "./nav.css";

interface NavProps {}

const Nav: FunctionComponent<NavProps> = () => {
  return (
    <>
      <div className="Nav">
        <div className="Nav-first-items-container">
          <img src={logo} alt="logo" className="Nav-logo"></img>
          <button
            type="button"
            className="s-border s-shadow pastel-red s-padding-top m-padding sides"
            onClick={() => {
              window.location.href = "/home";
            }}
          >
            votar
          </button>
          <a href="/books/post">
            <button
              type="button"
              className="s-border s-shadow s-padding-top m-padding sides"
            >
              sugerir
            </button>
          </a>
        </div>

        <div className="logout-button-container">
          <button
            type="button"
            className="Nav-logout-button s-border s-shadow s-padding-top bright-yellow m-padding sides"
            onClick={() => {
              window.sessionStorage.removeItem("user");
              window.sessionStorage.removeItem("jwt");
              window.location.href = "/";
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
