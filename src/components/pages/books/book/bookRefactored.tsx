import { FunctionComponent, Dispatch, SetStateAction } from "react";
import { Book, BookMetadata } from "../../../../api/interfaces/interfaces";
import "./book.css";
import TagsList from "../../../tags/tagsList";
import DescriptionComponent from "../../../description/description";
import VoteOnBookComponent from "../voteOnBookButton/voteOnBookButton";
import ReadBookComponent from "../readBookButton/readBookButton";
import EditBookComponent from "../editBookButton/editBookButton";
import DeleteBookComponent from "../deleteBookButton/deleteBookButton";
import MarkBookAsReadByClubButton from "../markBookAsReadByClubButton/markBookAsReadByClubButton";
import AddMetadataButton from "../addMetadataButton/addMetadataButton";

interface BookProps {
  bookData: Book & { BookMetadata: BookMetadata };
  displayBookVoters?: boolean;
  displayBookReaders?: boolean;
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  updatedBooksListSetter: Dispatch<SetStateAction<boolean>>;
}
const BookRefactored: FunctionComponent<BookProps> = (props) => {
  //responsibility: display all functionalities of book component, yet make logic for none
  return (
    <div className="BookComponent">
      <div className="buttons-container flex s-gap">
        <VoteOnBookComponent
          bookData={props.bookData}
          loadingSetter={props.loadingSetter}
          errorIsActiveSetter={props.errorIsActiveSetter}
          successIsActiveSetter={props.successIsActiveSetter}
          updatedBooksListSetter={props.updatedBooksListSetter}
        />
        <ReadBookComponent
          bookData={props.bookData}
          loadingSetter={props.loadingSetter}
          errorIsActiveSetter={props.errorIsActiveSetter}
          successIsActiveSetter={props.successIsActiveSetter}
          updatedBooksListSetter={props.updatedBooksListSetter}
        />
        <EditBookComponent
          bookData={props.bookData}
          errorIsActiveSetter={props.errorIsActiveSetter}
          loadingSetter={props.loadingSetter}
          successIsActiveSetter={props.successIsActiveSetter}
          updatedBooksListSetter={props.updatedBooksListSetter}
        />
        <DeleteBookComponent
          errorIsActiveSetter={props.errorIsActiveSetter}
          loadingSetter={props.loadingSetter}
          successIsActiveSetter={props.successIsActiveSetter}
          updatedBooksListSetter={props.updatedBooksListSetter}
          bookData={props.bookData}
        />
        <MarkBookAsReadByClubButton
          errorIsActiveSetter={props.errorIsActiveSetter}
          loadingSetter={props.loadingSetter}
          successIsActiveSetter={props.successIsActiveSetter}
          updatedBooksListSetter={props.updatedBooksListSetter}
          bookData={props.bookData}
        />
        <AddMetadataButton
          errorIsActiveSetter={props.errorIsActiveSetter}
          loadingSetter={props.loadingSetter}
          successIsActiveSetter={props.successIsActiveSetter}
          updatedBooksListSetter={props.updatedBooksListSetter}
          bookData={props.bookData}
        />
      </div>
      <div className="flex justify-between width-100">
        <h3 className="Book-title g-font bold font-black">
          {props.bookData.title}
        </h3>
      </div>
      <span className="book-author-text">{props.bookData.author}</span>
      <DescriptionComponent description={props.bookData.description} />
      {props.displayBookVoters && (
        <TagsList
          coloredIds={props.bookData.voters?.map((voter) => voter.id)}
          highlightedTagColor="red"
          userTags={props.bookData.voters}
        />
      )}
      {props.displayBookReaders && (
        <TagsList
          coloredIds={props.bookData.readers?.map((reader) => reader.id)}
          highlightedTagColor="blue"
          userTags={props.bookData.readers}
        />
      )}
    </div>
  );
};

export default BookRefactored;
