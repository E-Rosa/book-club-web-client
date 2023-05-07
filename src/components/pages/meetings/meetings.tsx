import { FunctionComponent, Dispatch, SetStateAction } from "react";
import Timeline from "../../timeline/timeline";

interface MeetingsPageProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}
const MeetingsPage: FunctionComponent<MeetingsPageProps> = (props) => {
  return (
    <>
      <div className="BookPage">
        <div className="BookPage-content">
          <Timeline
            loadingSetter={props.loadingSetter}
            errorIsActiveSetter={props.errorIsActiveSetter}
            successIsActiveSetter={props.successIsActiveSetter}
            timelineType="meetings"
          />
        </div>
      </div>
    </>
  );
};

export default MeetingsPage;
