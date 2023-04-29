import { FunctionComponent } from "react";
import "./home.css";
import { Dispatch, SetStateAction } from "react";
import Nav from "../../nav/nav";
import Timeline from "../../timeline/timeline";

interface HomepageProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}

const Homepage: FunctionComponent<HomepageProps> = (props) => {
  return (
    <>
      <Nav />
      <div className="Homepage">
      
      <Timeline
        loadingSetter={props.loadingSetter}
        errorIsActiveSetter={props.errorIsActiveSetter}
        successIsActiveSetter={props.successIsActiveSetter}
      />
    </div>
    </>
    
  );
};

export default Homepage;
