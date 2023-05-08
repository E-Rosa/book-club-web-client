import {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
} from "react";
import "../book/book.css";
import "./meeting.css";
import { Meeting, User } from "../../api/interfaces/interfaces";
import ParsingService from "../../api/services/parsingServices";
import editImg from "../../assets/edit.png";
import deleteImg from "../../assets/delete.png";
import MeetingRepo from "../../api/repository/meetingRepo";
import { setSuccess } from "../success/success";
import { setError } from "../error/error";

interface MeetingComponentProps {
  meetingData: Meeting;
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  updateMeetingsListSetter: Dispatch<SetStateAction<boolean>>;
}
const MeetingComponent: FunctionComponent<MeetingComponentProps> = (props) => {
  const user = JSON.parse(
    window.sessionStorage.getItem("user") as string
  ) as User;
  const isAdmin = user != null && user.isAdmin ? true : false;
  const isMeetingHost = user.id == props.meetingData.hostId;
  const editIcon = (
    <img
      src={editImg}
      className="s-clickable-icon"
      onClick={() => {
        setIsEditing(true);
      }}
    />
  );
  const deleteIcon = (
    <img
      src={deleteImg}
      className="s-clickable-icon"
      onClick={async () => {
        try {
          await MeetingRepo.deleteMeeting(
            props.loadingSetter,
            props.meetingData.id
          );
          setSuccess(props.successIsActiveSetter);
          props.updateMeetingsListSetter((prev) => !prev);
        } catch (error) {
          setError(props.errorIsActiveSetter);
        }
      }}
    />
  );
  const [newMeetingData, setNewMeetingData] = useState<Meeting>({
    ...props.meetingData,
  });
  const [isEditing, setIsEditing] = useState(false);
  function updateNewMeeting(event: ChangeEvent<HTMLInputElement>) {
    setNewMeetingData((prevMeetingData) => {
      return { ...prevMeetingData, [event.target.name]: event.target.value };
    });
  }
  return (
    <div className="BookComponent">
      {!isEditing && (
        <>
          <div className="MeetingComponent-icon-and-title-container">
            <div>
              <h3 className="Book-title g-font bold font-black">
                {props.meetingData.bookTitle}
              </h3>
            </div>
            <div className="flex s-gap">
              {isMeetingHost && editIcon}
              {isAdmin && deleteIcon}
            </div>
          </div>

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
        </>
      )}
      {isEditing && (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await MeetingRepo.putMeeting(props.loadingSetter, newMeetingData);
              setSuccess(props.successIsActiveSetter);
              setIsEditing(false);
              props.updateMeetingsListSetter((prev) => !prev);
            } catch (error) {
              setError(props.errorIsActiveSetter);
            }
          }}
          className="flex column s-gap"
        >
          <div className="MeetingComponent-icon-and-title-container">
            <input
              name="bookTitle"
              placeholder="titulo do livro"
              className="book-title-input"
              defaultValue={props.meetingData.bookTitle}
              onChange={updateNewMeeting}
            />
          </div>
          <input
            type="date"
            className="discrete-date-input"
            defaultValue={props.meetingData.date.toString()}
            onChange={updateNewMeeting}
            name="date"
          ></input>
          <input
            name="address"
            placeholder="endereço"
            className="book-author-input"
            defaultValue={props.meetingData.address}
            onChange={updateNewMeeting}
          />
          <input
            name="description"
            placeholder="adendos, avisos, etc"
            className="book-author-input"
            defaultValue={props.meetingData.description}
            onChange={updateNewMeeting}
          />
          <button type="submit" className="bright-yellow-button">
            enviar
          </button>
        </form>
      )}
    </div>
  );
};

export default MeetingComponent;
