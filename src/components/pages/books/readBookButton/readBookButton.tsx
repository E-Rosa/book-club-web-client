import { FunctionComponent, useState, Dispatch, SetStateAction } from "react";
import { Book, User } from "../../../../api/interfaces/interfaces";
import readWhiteImg from "../../../../assets/book-mark-white.png";
import readBlueImg from "../../../../assets/book-mark-blue.png";
import BookRepo from "../../../../api/repository/bookRepo";
import { setError } from "../../../error/error";
import { setSuccess } from "../../../success/success";

interface ReadBookButtonProps {
  bookData: Book;
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  updatedBooksListSetter: Dispatch<SetStateAction<boolean>>;
}
const ReadBookButton: FunctionComponent<ReadBookButtonProps> = (props) => {
  //responsibility: handle logic for reading a book
  const user: User = JSON.parse(window.sessionStorage.getItem("user") as string);
  const [isClickable, setIsClickable] = useState(true);
  const isReadByUser = props.bookData.readers ? props.bookData.readers.map(reader=>reader.email).includes(user.email) : false

  async function handleRead() {
    try {
      setIsClickable(false);
      await BookRepo.readBook(props.loadingSetter, props.bookData.id);
      setIsClickable(true);
      setSuccess(props.successIsActiveSetter);
      props.updatedBooksListSetter(prev=>!prev)
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  async function handleUnread() {
    try {
      setIsClickable(false);
      await BookRepo.unreadBook(props.loadingSetter, props.bookData.id);
      setIsClickable(true);
      setSuccess(props.successIsActiveSetter);
      props.updatedBooksListSetter(prev=>!prev)
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  const whiteBookMarkIcon = (
    <img
      src={readWhiteImg}
      alt="book mark"
      className="s-clickable-icon"
      onClick={handleRead}
    ></img>
  );
  const blueBookMarkIcon = (
    <img
      src={readBlueImg}
      alt="book mark"
      className="s-clickable-icon"
      onClick={handleUnread}
    ></img>
  );
  return <div className="ReadBookButton">
    {isClickable && isReadByUser && props.bookData.isRead && blueBookMarkIcon}
    {isClickable && !isReadByUser && props.bookData.isRead && whiteBookMarkIcon}
  </div>;
};

export default ReadBookButton;