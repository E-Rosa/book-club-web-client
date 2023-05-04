import { FunctionComponent, Dispatch, SetStateAction } from "react";
import "./signupRequest.css";
import UserRepo from "../../api/repository/userRepo";
import { setSuccess } from "../success/success";
import { setError } from "../error/error";

interface SignupRequestProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  unauthorizedUsersUpdatedSetter: Dispatch<SetStateAction<boolean>>;
  user: { email: string; name: string };
}

const SignupRequest: FunctionComponent<SignupRequestProps> = (props) => {
    async function handleAcceptSignup(){
      try{
        await UserRepo.acceptUnauthorizedUser(props.loadingSetter, props.user.email)
        setSuccess(props.successIsActiveSetter)
        props.unauthorizedUsersUpdatedSetter((prev)=>!prev)
      }
      catch(error){
        setError(props.errorIsActiveSetter)
      }
    }
    async function handleDeclineSignup(){
      try{
        await UserRepo.deleteUnauthorizedUser(props.loadingSetter, props.user.email)
        props.unauthorizedUsersUpdatedSetter((prev)=>!prev)
        setSuccess(props.successIsActiveSetter)
      }
      catch(error){
        setError(props.errorIsActiveSetter)
      }
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
