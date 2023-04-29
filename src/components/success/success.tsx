import { Dispatch, FunctionComponent, SetStateAction } from "react";
import successIcon from "../../assets/success-icon.png";
import "./success.css";

interface SuccessProps {
  isActive: boolean;
}

const setSuccess = (
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>
) => {
  successIsActiveSetter(true);
  setTimeout(() => {
    successIsActiveSetter(false);
  }, 2000);
};

const Success: FunctionComponent<SuccessProps> = (props) => {
  return (
    <>
      {props.isActive && (

          <div className="Success-container s-border s-shadow">
            <img src={successIcon} alt="success icon" className="right-icon"/>
          </div>
      )}
    </>
  );
};

export default Success;
export { setSuccess };
