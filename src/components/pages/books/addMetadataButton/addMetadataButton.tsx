import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import addIconImg from "../../../../assets/add.png";
import {
  Book,
  BookMetadata,
  User,
} from "../../../../api/interfaces/interfaces";
import BookMetadataFormComponent from "../bookMetadataForm/bookMetadataForm";
import ScreenOverlayComponent from "../../../screenOverlay/screenOverlay";

interface AddMetadataButtonProps {
  bookData: (Book & {BookMetadata: BookMetadata});
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  updatedBooksListSetter: Dispatch<SetStateAction<boolean>>;
}

const AddMetadataButton: FunctionComponent<AddMetadataButtonProps> = (
  props
) => {
  const [isEditingBookMetadata, setIsEditingBookMetadata] = useState(false);
  const user: User = JSON.parse(
    window.sessionStorage.getItem("user") as string
  );
  const addIcon = (
    <img
      src={addIconImg}
      alt="add icon"
      className="s-clickable-icon"
      onClick={()=>{setIsEditingBookMetadata(true)}}
    />
  );
  return (
    <>
      {user.isAdmin && props.bookData.isRead && addIcon}
      {isEditingBookMetadata && (
        <ScreenOverlayComponent
          content={
            <BookMetadataFormComponent
              bookData={props.bookData}
              loadingSetter={props.loadingSetter}
              errorIsActiveSetter={props.errorIsActiveSetter}
              successIsActiveSetter={props.successIsActiveSetter}
              previousMetadata={
                props.bookData.BookMetadata ? props.bookData.BookMetadata : undefined
              }
              updateBooksListSetter={props.updatedBooksListSetter}
            />
            
          }
          isActive={isEditingBookMetadata}
          isActiveSetter={setIsEditingBookMetadata}
        />
      )}
    </>
  );
};

export default AddMetadataButton;
