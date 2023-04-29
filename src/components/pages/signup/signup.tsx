import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { SignUpData } from "../../../api/interfaces/interfaces";
import UserRepo from "../../../api/repository/userRepo";
import { setError } from "../../error/error";
import "./signup.css";
import logo from "../../../assets/book-club-web-logo-unique.png";
import { setSuccess } from "../../success/success";
import { Link, useNavigate } from "react-router-dom";

interface SignupPageProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}

const SignupPage: FunctionComponent<SignupPageProps> = (props) => {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const updateSignUpData = (event: ChangeEvent<HTMLInputElement>) => {
    setSignUpData((prevSignUpData) => {
      return { ...prevSignUpData, [event.target.name]: event.target.value };
    });
  };
  const navigate = useNavigate();
  return (
    <div className="SignupPage">
      <img src={logo}></img>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            if (signUpData.password != signUpData.repeatPassword) {
              throw new Error("senhas não são identicas");
            }
            await UserRepo.signup(props.loadingSetter, signUpData);
            setSuccess(props.successIsActiveSetter);
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } catch (error: any) {
            setError(props.errorIsActiveSetter);
          }
        }}
      >
        <input
          onChange={updateSignUpData}
          type="text"
          placeholder="email"
          name="email"
          className="s-shadow s-border m-padding-top g-padding-sides"
        ></input>
        <input
          onChange={updateSignUpData}
          type="text"
          placeholder="nome e sobrenome"
          name="name"
          className="s-shadow s-border m-padding-top g-padding-sides"
        ></input>
        <input
          onChange={updateSignUpData}
          type="password"
          placeholder="senha"
          name="password"
          className="s-shadow s-border m-padding-top g-padding-sides"
        ></input>
        <input
          onChange={updateSignUpData}
          type="password"
          placeholder="repetir senha"
          name="repeatPassword"
          className="s-shadow s-border m-padding-top g-padding-sides"
        ></input>
        <button
          type="submit"
          className="login-button s-shadow s-border bright-yellow"
        >
          cadastrar
        </button>
        <Link to="/">
          <button
            type="button"
            className="signup-button s-shadow s-border bright-yellow-desaturated"
          >
            voltar
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
