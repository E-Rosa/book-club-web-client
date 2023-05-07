import {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
} from "react";
import { Meeting } from "../../../../api/interfaces/interfaces";
import { User } from "../../../../api/interfaces/interfaces";
import { setSuccess } from "../../../success/success";
import { setError } from "../../../error/error";
import MeetingRepo from "../../../../api/repository/meetingRepo";

interface PostMeetingProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}
const PostMeeting: FunctionComponent<PostMeetingProps> = (props) => {
  const user = JSON.parse(
    window.sessionStorage.getItem("user") as string
  ) as User;
  const [newMeetingData, setNewMeetingData] = useState<Meeting>({
    id: "",
    hostId: user.id,
    address: "",
    bookTitle: "",
    date: new Date(),
    description: "",
    host: {
      email: user.email,
      id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
    },
  });
  function updateMeetingData(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setNewMeetingData((prevMeetingData) => {
      return { ...prevMeetingData, [event.target.name]: event.target.value };
    });
  }
  return (
    <>
      <div className="NewBookPage">
        <div className="NewBook">
          <span className="blue-button g-font">Sugira uma Reunião</span>
          <form
            className=""
            onSubmit={async (event) => {
              try {
                event.preventDefault();
                await MeetingRepo.postMeeting(props.loadingSetter, newMeetingData);
                setSuccess(props.successIsActiveSetter);
              } catch {
                setError(props.errorIsActiveSetter);
              }
            }}
          >
            <input
              type="text"
              className="standard-text-input"
              name="bookTitle"
              placeholder="livro"
              onChange={updateMeetingData}
            />

            <input
              type="text"
              className="standard-text-input"
              name="address"
              placeholder="endereço"
              onChange={updateMeetingData}
            />
            <input
              type="date"
              className="standard-text-input"
              name="date"

              placeholder="endereço"
              onChange={updateMeetingData}
            />
            <textarea
              className="standard-text-input description-input"
              name="description"
              placeholder="descrição"
              onChange={updateMeetingData}
            />
            <button className="bright-yellow-button" type="submit">
              salvar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostMeeting;
