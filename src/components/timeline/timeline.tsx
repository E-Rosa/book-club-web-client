import { FunctionComponent, MouseEvent, useEffect, useState } from "react";
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
  const [books, setBooks] = useState<Book[]>([]);
  const [updatedBooksList, setUpdatedBooksList] = useState(false);
  const [getBooksFilter, setGetBooksFilter] =
    useState<GetBooksFilter>("suggested");
  const [suggestedBooksCount, setSuggestedBooksCount] = useState(0);
  const [readBooksCount, setReadBooksCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const user: User = JSON.parse(
    window.sessionStorage.getItem("user") as string
  );
  console.log(books)
  const bookComponents = () => {
    return books.map((book: Book) => {
      return (
        <BookComponent
          book={book}
          key={book.id}
          loadingSetter={props.loadingSetter}
          errorIsActiveSetter={props.errorIsActiveSetter}
          successIsActiveSetter={props.successIsActiveSetter}
          updatedBooksListSetter={setUpdatedBooksList}
        />
      );
    });
  };
  const paginationNumberButtons = () => {
    const suggestedBooksPages = Array.from(
      Array(Math.ceil(suggestedBooksCount / 10))
    );
    const readBooksPages = Array.from(Array(Math.ceil(readBooksCount / 10)));
    const getPaginationNumberButtonsByCount = (pages: undefined[]) => {
      return pages.map((undf, index) => {
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
    if (getBooksFilter == "suggested") {
      return getPaginationNumberButtonsByCount(suggestedBooksPages);
    } else if (getBooksFilter == "read") {
      return getPaginationNumberButtonsByCount(readBooksPages);
    }
  };
  function handleChangePage(event: MouseEvent<HTMLButtonElement>) {
    const pageClicked = parseInt(event.currentTarget.id);
    const amountToSkip = pageClicked * 10 - 10;
    setSkip(amountToSkip);
  }
  useEffect(() => {
    if (getBooksFilter == "suggested") {
      BookRepo.getSuggestedBooksPaginated(props.loadingSetter, skip)
        .then((response: { books: Book[]; count: number }) => {
          setBooks(response.books);
          setSuggestedBooksCount(response.count);
        })
        .catch(() => {
          setError(props.errorIsActiveSetter);
        });
    } else if (getBooksFilter == "read") {
      BookRepo.getReadBooksPaginated(props.loadingSetter, skip)
        .then((response: { books: Book[]; count: number }) => {
          setBooks(response.books);
          setReadBooksCount(response.count);
        })
        .catch(() => {
          setError(props.errorIsActiveSetter);
        });
    }
  }, [getBooksFilter, updatedBooksList, skip]);
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
        {getBooksFilter == "read" && (
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
      </div>
      {bookComponents()}
      <div className="timeline-page-icons">{paginationNumberButtons()}</div>
    </div>
  );
};

export default Timeline;
