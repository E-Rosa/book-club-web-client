import { FunctionComponent } from "react";
import logo from "../../assets/book-club-web-logo-horizontal.png";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface NavProps {}

const Nav: FunctionComponent<NavProps> = () => {
  const isHomePage = window.location.href.includes("/home")
  const isBookPostPage = window.location.href.includes("/books/post")
  const navigate = useNavigate();
  return (
    <>
      <div className="Nav">
        <div className="Nav-first-items-container">
          <img src={logo} alt="logo" className="Nav-logo"></img>
          <button
            type="button"
            className={isHomePage ? "red-button" : "white-button"}
            onClick={() => {
               navigate("/home")
            }}
          >
            votar
          </button>
          <Link to="/books/post">
            <button
              type="button"
              className={isBookPostPage ? "red-button" : "white-button"}
            >
              sugerir
            </button>
          </Link>
        </div>

        <div className="logout-button-container">
          <button
            type="button"
            className="bright-yellow-button"
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
