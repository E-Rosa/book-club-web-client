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
  const [message, setMessage] = useState("");
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
            await UserRepo.requestSignup(props.loadingSetter, signUpData);
            setSuccess(props.successIsActiveSetter);
            setMessage("sua conta foi solicitada e poderá ser aceita em breve.")
            setTimeout(() => {
              navigate("/");
            }, 4000);
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
          className="standard-text-input"
        ></input>
        <input
          onChange={updateSignUpData}
          type="text"
          placeholder="nome e sobrenome"
          name="name"
          className="standard-text-input"
        ></input>
        <input
          onChange={updateSignUpData}
          type="password"
          placeholder="senha"
          name="password"
          className="standard-text-input"
        ></input>
        <input
          onChange={updateSignUpData}
          type="password"
          placeholder="repetir senha"
          name="repeatPassword"
          className="standard-text-input"
        ></input>
        <span>{message}</span>
        <button
          type="submit"
          className="bright-yellow-button"
        >
          cadastrar
        </button>
        <Link to="/">
          <button
            type="button"
            className="bright-yellow-desaturated-button"
          >
            voltar
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
