import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from "react";
import "./login.css";
import logo from "../../../assets/book-club-web-logo-unique.png";
import { LoginData } from "../../../api/interfaces/interfaces";
import { useState } from "react";
import { setSuccess } from "../../success/success";
import { setError } from "../../error/error";
import UserRepo from "../../../api/repository/userRepo";
import { Link, useNavigate } from "react-router-dom";

interface LoginPageProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}

const LoginPage: FunctionComponent<LoginPageProps> = (props) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const updateLoginData = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevLoginData) => {
      return { ...prevLoginData, [event.target.name]: event.target.value };
    });
  };
  const navigate = useNavigate();
  return (
    <div className="LoginPage">
      <div className="LoginPage-content">
        <img src={logo} alt="logo" />
        <form
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              const response = await UserRepo.login(
                props.loadingSetter,
                loginData
              );
              const { jwt, user } = response;
              window.sessionStorage.setItem("jwt", jwt);
              window.sessionStorage.setItem("user", JSON.stringify(user));
              setSuccess(props.successIsActiveSetter);
              setTimeout(() => {
                navigate("/home")
              }, 1000);
            } catch (error: any) {
              setError(props.errorIsActiveSetter);
            }
          }}
        >
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={updateLoginData}
            className="standard-text-input"
          ></input>
          <input
            type="password"
            placeholder="senha"
            name="password"
            onChange={updateLoginData}
            className="standard-text-input"
          ></input>
          <button
            type="submit"
            className="bright-yellow-button"
          >
            entrar
          </button>
          <Link to="/signup">
            <button
              type="button"
              className="bright-yellow-desaturated-button"
            >
              cadastrar
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
