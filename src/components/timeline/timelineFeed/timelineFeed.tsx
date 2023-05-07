import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { setError } from "../../error/error";
import {
  Book,
  Meeting,
  User,
  feedNames,
} from "../../../api/interfaces/interfaces";
import BookRepo from "../../../api/repository/bookRepo";
import BookComponent from "../../book/book";
import blueBookMark from "../../../assets/book-mark-blue.png";
import whiteBookMark from "../../../assets/book-mark-white.png";
import MeetingRepo from "../../../api/repository/meetingRepo";
import MeetingComponent from "../../meeting/meeting";
import NewBookPage from "../../pages/books/postBook/postBook";
import PostMeeting from "../../pages/meetings/postMeeting/postMeeting";

interface TimelineFeedProps {
  feedName: feedNames;
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}
const TimelineFeed: FunctionComponent<TimelineFeedProps> = (props) => {
  /* responsibility: display the right feed among: suggested books,
  read books, user books, scheduled meetings, past meetings, suggest meeting and suggest book
  feed consists of: a list of books or meetings and pagination */
  const user: User = JSON.parse(
    window.sessionStorage.getItem("user") as string
  );
  const [timelineItemsCount, setTimelineItemsCount] = useState(0);
  const [timelineItems, setTimelineItems] = props.feedName.includes("books")
    ? useState<Book[] | Meeting[]>([])
    : useState<Meeting[] | Book[]>([]);
  const [skip, setSkip] = useState(0);
  const [updatedTimelineItems, setUpdatedTimelineItems] = useState(false);

  useEffect(() => {
    if (props.feedName == "suggested-books") {
      BookRepo.getSuggestedBooksPaginated(props.loadingSetter, skip)
        .then((response: { books: Book[]; count: number }) => {
          setTimelineItems(response.books);
          setTimelineItemsCount(response.count);
        })
        .catch(() => {
          setError(props.errorIsActiveSetter);
        });
    } else if (props.feedName == "read-books") {
      BookRepo.getReadBooksPaginated(props.loadingSetter, skip)
        .then((response: { books: Book[]; count: number }) => {
          setTimelineItems(response.books);
          setTimelineItemsCount(response.count);
        })
        .catch(() => {
          setError(props.errorIsActiveSetter);
        });
    } else if (props.feedName == "user-books") {
      BookRepo.getPersonalSuggestionsPaginated(
        props.loadingSetter,
        skip,
        user.id
      )
        .then((response: { books: Book[]; count: number }) => {
          setTimelineItems(response.books);
          setTimelineItemsCount(response.count);
        })
        .catch(() => {
          setError(props.errorIsActiveSetter);
        });
    } else if (props.feedName == "past-meetings") {
      MeetingRepo.getMeetingsPaginated(props.loadingSetter, skip)
        .then((response: { meetings: Meeting[]; count: number }) => {
          setTimelineItems(
            response.meetings.filter((mt) => new Date(mt.date) < new Date())
          );
          setTimelineItemsCount(response.count);
        })
        .catch(() => {
          setError(props.errorIsActiveSetter);
        });
    } else if (props.feedName == "scheduled-meetings") {
      MeetingRepo.getMeetingsPaginated(props.loadingSetter, skip)
        .then((response: { meetings: Meeting[]; count: number }) => {

          setTimelineItems(
            response.meetings.filter((mt) => new Date(mt.date) >= new Date())
          );
          setTimelineItemsCount(response.count);
        })
        .catch(() => {
          setError(props.errorIsActiveSetter);
        });
    }
  }, [props.feedName, skip, updatedTimelineItems]);

  const timelineComponents = () => {
    return timelineItems.map((timelineItem: Book | Meeting) => {
      if (props.feedName.includes("books")) {
        return (
          <BookComponent
            book={timelineItem as Book}
            key={timelineItem.id}
            loadingSetter={props.loadingSetter}
            errorIsActiveSetter={props.errorIsActiveSetter}
            successIsActiveSetter={props.successIsActiveSetter}
            updatedBooksListSetter={setUpdatedTimelineItems}
          />
        );
      } else if (props.feedName.includes("meetings")) {
        return (
          <MeetingComponent
            meetingData={timelineItem as Meeting}
            loadingSetter={props.loadingSetter}
            errorIsActiveSetter={props.errorIsActiveSetter}
            successIsActiveSetter={props.successIsActiveSetter}
            updateMeetingsListSetter={setUpdatedTimelineItems}
            key={timelineItem.id}
          />
        );
      }
    });
  };
  const paginationNumberButtons = () => {
    const booksPages = Array.from(Array(Math.ceil(timelineItemsCount / 10)));
    const getPaginationNumberButtonsByCount = (pages: undefined[]) => {
      return pages.map((_, index) => {
        if (skip / 10 == index || (skip == 0 && index == 0)) {
          return (
            <button
              className="red-pagination-button"
              id={`${index + 1}`}
              onClick={handleChangePage}
              key={index}
            >
              {index + 1}
            </button>
          );
        } else {
          return (
            <button
              className="white-pagination-button"
              id={`${index + 1}`}
              key={index}
              onClick={handleChangePage}
            >
              {index + 1}
            </button>
          );
        }
      });
    };

    return getPaginationNumberButtonsByCount(booksPages);
  };
  function handleChangePage(event: MouseEvent<HTMLButtonElement>) {
    const pageClicked = parseInt(event.currentTarget.id);
    const amountToSkip = pageClicked * 10 - 10;
    window.scrollTo(0, 0);
    setSkip(amountToSkip);
  }
  return (
    <>
      {props.feedName != "suggest-book" &&
        props.feedName != "suggest-meeting" && (
          <div className="Timeline">
            {props.feedName == "read-books" && (
              <div className="timeline-icons-tooltip">
                <div className="flex align-center">
                  <img
                    src={whiteBookMark}
                    alt="book mark white"
                    className="ss-icon"
                  />
                  <span>= não lido</span>
                </div>
                <div className="flex align-center">
                  <img
                    src={blueBookMark}
                    alt="book mark blue"
                    className="ss-icon"
                  />
                  <span>= lido</span>
                </div>
              </div>
            )}
            {timelineComponents()}
            <div className="flex s-gap wrap">{paginationNumberButtons()}</div>
          </div>
        )}
      {props.feedName == "suggest-book" && (
        <NewBookPage
          loadingSetter={props.loadingSetter}
          errorIsActiveSetter={props.errorIsActiveSetter}
          successIsActiveSetter={props.successIsActiveSetter}
        />
      )}
      {props.feedName == "suggest-meeting" && (
        <PostMeeting
          loadingSetter={props.loadingSetter}
          errorIsActiveSetter={props.errorIsActiveSetter}
          successIsActiveSetter={props.successIsActiveSetter}
        />
      )}
    </>
  );
};

export default TimelineFeed;
