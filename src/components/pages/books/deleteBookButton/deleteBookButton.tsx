import { Book, User } from "../../../../api/interfaces/interfaces";
import BookRepo from "../../../../api/repository/bookRepo";
import deleteImg from "../../../../assets/delete.png";
import { FunctionComponent, Dispatch, SetStateAction } from "react";
import { setSuccess } from "../../../success/success";
import { setError } from "../../../error/error";

interface DeleteBookButtonProps {
  bookData: Book;
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  updatedBooksListSetter: Dispatch<SetStateAction<boolean>>;
}

const DeleteBookButton: FunctionComponent<DeleteBookButtonProps> = (props) => {
  const user: User = JSON.parse(
    window.sessionStorage.getItem("user") as string
  );
  async function handleDeleteBook() {
    try {
      await BookRepo.deleteBook(props.loadingSetter, props.bookData.id);
      setSuccess(props.successIsActiveSetter);
      props.updatedBooksListSetter((prev) => !prev);
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  const deleteIcon = (
    <img
      src={deleteImg}
      alt="delete icon"
      className="s-clickable-icon"
      onClick={handleDeleteBook}
    ></img>
  );
  return <>{user.isAdmin && deleteIcon}</>;
};

export default DeleteBookButton;
