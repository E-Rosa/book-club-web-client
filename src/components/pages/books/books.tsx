import { FunctionComponent } from "react";
import "./books.css";
import { Dispatch, SetStateAction } from "react";
import Timeline from "../../timeline/timeline";

interface BookPageProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}

const BookPage: FunctionComponent<BookPageProps> = (props) => {
  return (
    <>
      <div className="BookPage">
      <div className="BookPage-content">
        <Timeline
          loadingSetter={props.loadingSetter}
          errorIsActiveSetter={props.errorIsActiveSetter}
          successIsActiveSetter={props.successIsActiveSetter}
          timelineType="books"
        />
      </div>
    </div>
    </>

  );
};

export default BookPage;
