import { FunctionComponent, useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import BookRepo from "../../api/repository/bookRepo";
import "./timeline.css";
import { setError } from "../error/error";
import BookComponent from "../book/book";
import { Book, GetBooksFilter, User } from "../../api/interfaces/interfaces";
import blueBookMark from "../../assets/book-mark-blue.png";
import whiteBookMark from "../../assets/book-mark-white.png";

interface TimelineProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}

const Timeline: FunctionComponent<TimelineProps> = (props) => {
  const user: User = JSON.parse(
    window.sessionStorage.getItem("user") as string
  );
  const [books, setBooks] = useState<Book[]>([]);
  const [getBooksFilter, setGetBooksFilter] =
    useState<GetBooksFilter>("suggested");
  useEffect(() => {
    if (getBooksFilter == "suggested") {
      BookRepo.getSuggestedBooks(props.loadingSetter)
        .then((books) => {
          setBooks(books);
        })
        .catch(() => {
          setError(props.errorIsActiveSetter);
        });
    } else if (getBooksFilter == "read") {
      BookRepo.getReadBooks(props.loadingSetter)
        .then((books: Book[]) => {
          setBooks(books);
        })
        .catch(() => {
          setError(props.errorIsActiveSetter);
        });
    }
  }, [getBooksFilter]);
  const bookComponents = () => {
    return books.map((book: Book) => {
      return (
        <BookComponent
          book={book}
          key={book.id}
          loadingSetter={props.loadingSetter}
          errorIsActiveSetter={props.errorIsActiveSetter}
          successIsActiveSetter={props.successIsActiveSetter}
        />
      );
    });
  };
  return (
    <div className="Timeline">
      <div className="timeline-header">
        <div className="flex s-gap">
          <button
            type="button"
            className={
              getBooksFilter == "suggested" ? "red-button" : "white-button"
            }
            onClick={() => {
              setGetBooksFilter("suggested");
            }}
          >
            sugeridos
          </button>
          <button
            type="button"
            className={getBooksFilter == "read" ? "red-button" : "white-button"}
            onClick={() => {
              setGetBooksFilter("read");
            }}
          >
            lidos
          </button>
        </div>
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
            <img src={blueBookMark} alt="book mark blue" className="ss-icon" />
            <span>= lido</span>
          </div>
        </div>
      </div>
      {bookComponents()}
    </div>
  );
};

export default Timeline;
