import { FunctionComponent, useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import BookRepo from "../../api/repository/bookRepo";
import "./timeline.css";
import { setError } from "../error/error";
import BookComponent from "../book/book";
import { Book } from "../../api/interfaces/interfaces";

interface TimelineProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}

const Timeline: FunctionComponent<TimelineProps> = (props) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    BookRepo.getBooks(props.loadingSetter)
      .then((books) => {
        setBooks(books);
      })
      .catch((error) => {
        setError(props.errorIsActiveSetter);
      });
  }, []);
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
  return <div className="Timeline">{bookComponents()}</div>;
};

export default Timeline;
