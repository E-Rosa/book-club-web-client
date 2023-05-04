import { FunctionComponent, Dispatch, SetStateAction } from "react";
import "./signupRequest.css";

interface SignupRequestProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  user: { email: string; name: string };
}

const SignupRequest: FunctionComponent<SignupRequestProps> = (props) => {
    function handleAcceptSignup(){

    }
    function handleDeclineSignup(){
        
    }
  return (
    <>
      <div className="SignupRequest">
        <span className="bold">{props.user.name}</span>
        <span>{props.user.email}</span>
        <div className="flex m-gap">
          <button type="button" className="bright-green-button" onClick={handleAcceptSignup}>
            aceitar
          </button>
          <button type="button" className="red-button" onClick={handleDeclineSignup}>
            negar
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupRequest;
