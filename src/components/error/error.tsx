import { Dispatch, FunctionComponent, SetStateAction} from "react";
import errorIcon from "../../assets/error-icon.png"
import "./error.css";

interface ErrorProps {
  isActive: boolean;
  isActiveSetter: Dispatch<SetStateAction<any>>;
}

const setError = (
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>,
) => {
  errorIsActiveSetter(true);
  setTimeout(()=>{errorIsActiveSetter(false)}, 2000)
};

const Error: FunctionComponent<ErrorProps> = (props) => {
  return (
    <>
      {props.isActive && (
        <div className="Success-container s-border s-shadow">
          <img src={errorIcon} alt="error-icon" className="right-icon"/>
        </div>
      )}
    </>
  );
};

export default Error;
export {setError}
