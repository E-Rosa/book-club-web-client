import { FunctionComponent, Dispatch, SetStateAction } from "react";
import "../book/book.css";
import "./meeting.css"
import { Meeting } from "../../api/interfaces/interfaces";
import ParsingService from "../../api/services/parsingServices";

interface MeetingComponentProps {
  meetingData: Meeting;
}
const MeetingComponent: FunctionComponent<MeetingComponentProps> = (props) => {
  return (
    <div className="BookComponent">
      <h3 className="Book-title g-font bold font-black">
        {props.meetingData.bookTitle}
      </h3>
      <span className="book-author-text">
        {ParsingService.parseDateToBrazilianString(props.meetingData.date)}
      </span>
      <span className="book-author-text">{props.meetingData.address}</span>
      {props.meetingData.description}
      <div className="participants-container">
        <span className="voter-tag font-black s-border pastel-green">
          {props.meetingData.host.name}
        </span>
      </div>

    </div>
  );
};

export default MeetingComponent;
