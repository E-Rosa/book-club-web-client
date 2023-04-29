import { FunctionComponent } from "react";
import "./loader.css";

interface LoaderProps {
  isLoading: boolean;
}

const Loader: FunctionComponent<LoaderProps> = (props) => {
  return (
    <>
      {props.isLoading && (
        <div className="loader-container s-border s-shadow">
          <div className="loader-spinner"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
