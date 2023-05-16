import { Dispatch, FunctionComponent, SetStateAction } from "react";
import whiteFolder from "../../../../assets/folder-white.png";
import yellowFolder from "../../../../assets/folder-yellow.png";
import BookRepo from "../../../../api/repository/bookRepo";
import { setSuccess } from "../../../success/success";
import { setError } from "../../../error/error";
import { Book, User } from "../../../../api/interfaces/interfaces";

interface MarkBookAsReadByClubButtonProps{
    bookData: Book;
    loadingSetter: Dispatch<SetStateAction<boolean>>;
    errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
    successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
    updatedBooksListSetter: Dispatch<SetStateAction<boolean>>;
}

const MarkBookAsReadByClubButton: FunctionComponent<MarkBookAsReadByClubButtonProps> = (props) =>{
  const user: User = JSON.parse(
    window.sessionStorage.getItem("user") as string
  );
    async function handleMarkAsReadByClub() {
        try {
          await BookRepo.markBookAsReadByClub(props.loadingSetter, props.bookData.id);
          setSuccess(props.successIsActiveSetter);
          props.updatedBooksListSetter((prev) => !prev);
        } catch (error) {
          setError(props.errorIsActiveSetter);
        }
      }
      async function handleUnmarkAsReadByClub() {
        try {
          await BookRepo.unmarkBookAsReadByClub(props.loadingSetter, props.bookData.id);
          setSuccess(props.successIsActiveSetter);
          props.updatedBooksListSetter((prev) => !prev);
        } catch (error) {
          setError(props.errorIsActiveSetter);
        }
      }
    const whiteFolderIcon = (
        <img
          src={whiteFolder}
          alt="white folder icon"
          className="s-clickable-icon"
          onClick={handleMarkAsReadByClub}
        ></img>
      );
      const yellowFolderIcon = (
        <img
          src={yellowFolder}
          alt="yellow folder icon"
          className="s-clickable-icon"
          onClick={handleUnmarkAsReadByClub}
        ></img>
      );
    return <>
        {props.bookData.isRead && user.isAdmin && yellowFolderIcon}
        {!props.bookData.isRead && user.isAdmin && whiteFolderIcon}
    </>
}

export default MarkBookAsReadByClubButton