import { Dispatch, FunctionComponent, SetStateAction, useEffect } from "react";
import "./error.css";

interface ErrorProps {
  isActive: boolean;
  message: string;
  isActiveSetter: Dispatch<SetStateAction<any>>;
}

const Error: FunctionComponent<ErrorProps> = (props) => {
  return (
    <>
      {props.isActive && (
        <div className="Error">
          <span className="error-message">{props.message}</span>
          <button
            type="button"
            onClick={() => {
              props.isActiveSetter(false);
            }}
            className="error-close-button"
          >x</button>
        </div>
      )}
    </>
  );
};

export default Error;
