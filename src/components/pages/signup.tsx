import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { SignUpData } from "../../api/interfaces/interfaces";
import UsersRepo from "../../api/repository/usersRepo";

interface SignupPageProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
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
  return (
    <div className="SignupPage">
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const success = await UsersRepo.signup(props.loadingSetter, signUpData);
            if(success){
                console.log('signup success')
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <input
          onChange={updateSignUpData}
          type="text"
          placeholder="email"
          name="email"
        ></input>
        <input
          onChange={updateSignUpData}
          type="text"
          placeholder="nome e sobrenome"
          name="name"
        ></input>
        <input
          onChange={updateSignUpData}
          type="password"
          placeholder="senha"
          name="password"
        ></input>
        <input
          onChange={updateSignUpData}
          type="password"
          placeholder="repetir senha"
          name="repeatPassword"
        ></input>
        <button type="submit">cadastrar</button>
        <a href="/login">
          <button type="button">voltar</button>
        </a>
      </form>
    </div>
  );
};

export default SignupPage;
