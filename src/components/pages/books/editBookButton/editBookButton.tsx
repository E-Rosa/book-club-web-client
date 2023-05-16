import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import editImg from "../../../../assets/edit.png";
import ScreenOverlayComponent from "../../../screenOverlay/screenOverlay";
import BookFormComponent from "../bookForm/bookForm";
import { Book, User } from "../../../../api/interfaces/interfaces";

interface EditBookProps {
  bookData: Book;
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  updatedBooksListSetter: Dispatch<SetStateAction<boolean>>;
}

const EditBookButton: FunctionComponent<EditBookProps> = (props) => {
  //responsibility: display an edit icon when demanded, open an editBookForm.
  const user: User = JSON.parse(
    window.sessionStorage.getItem("user") as string
  );
  const userIsPostAuthor =  props.bookData.postAuthorId == user.id
  const editIcon = (
    <img
      src={editImg}
      alt="edit mark"
      className="s-clickable-icon"
      onClick={() => {
        setIsEditingBook(true);
      }}
    ></img>
  );
  const [isEditingBook, setIsEditingBook] = useState(false);
  return (
    <>
      {(user.isAdmin || userIsPostAuthor) && editIcon}
      {isEditingBook && (
        <ScreenOverlayComponent
          content={
            <BookFormComponent
              errorIsActiveSetter={props.errorIsActiveSetter}
              loadingSetter={props.loadingSetter}
              successIsActiveSetter={props.successIsActiveSetter}
              updateBook
              updateBooksListSetter={props.updatedBooksListSetter}
              previousBookData={props.bookData}
            />
          }
          isActive={isEditingBook}
          isActiveSetter={setIsEditingBook}
        />
      )}
    </>
  );
};

export default EditBookButton;
