import {
  FunctionComponent,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
  ChangeEvent,
  useContext,
} from "react";
import {
  Book,
  BookMetadata,
  User,
} from "../../../../api/interfaces/interfaces";
import whiteHeart from "../../../../assets/heart-white.png";
import redHeart from "../../../../assets/heart-red.png";
import whiteBookMark from "../../../../assets/book-mark-white.png";
import blueBookMark from "../../../../assets/book-mark-blue.png";
import whiteFolder from "../../../../assets/folder-white.png";
import yellowFolder from "../../../../assets/folder-yellow.png";
import edit from "../../../../assets/edit.png";
import deleteImg from "../../../../assets/delete.png";
import addMetadataImg from "../../../../assets/add.png";
import "./book.css";
import BookRepo from "../../../../api/repository/bookRepo";
import { setError } from "../../../error/error";
import { setSuccess } from "../../../success/success";
import PostBookMetadata from "../bookMetadataForm/bookMetadataForm";
import { UserMessageContext } from "../../../../App";

interface BookComponentProps {
  book: Book & { BookMetadata: BookMetadata };
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  updatedBooksListSetter: Dispatch<SetStateAction<boolean>>;
  //domUpdateSetter: Dispatch<SetStateAction<boolean>>;
} 

const BookComponent: FunctionComponent<BookComponentProps> = (props) => {
  //responsibility: display the correct view between all properties of the book

  useEffect(() => {
    setVoters(props.book.voters);
    setReaders(props.book.readers);
  }, [props.book]);
  const [voters, setVoters] = useState(props.book.voters);
  const [readers, setReaders] = useState(props.book.readers);
  const [isVotable, setIsVotable] = useState(true);
  const [isReadable, setIsReadable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingMetadata, setIsAddingMetadata] = useState(false);
  const [isReadingDescription, setIsReadingDescription] = useState(false);
  const [editedBookData, setEditedBookData] = useState<
    Book & { BookMetadata: BookMetadata }
  >(props.book);
  const [bookData, setBookData] = useState<Book & { BookMetadata: BookMetadata }>(props.book);
  const user = JSON.parse(window.sessionStorage.getItem("user") as string);
  const voterEmails =
    voters != undefined
      ? voters.map((vote) => {
          return vote.email;
        })
      : [];

  const readerEmails =
    readers != undefined
      ? readers.map((reader) => {
          return reader.email;
        })
      : [];

  const isVoted = voterEmails.includes(user.email);
  const isRead = readerEmails.includes(user.email);
  const isReadByClub = props.book.isRead;
  const isPostAuthor = props.book.postAuthorId == user.id;
  const isAdmin = user.isAdmin && user.isAdmin == true ? true : false;
  const whiteHeartIcon = (
    <img
      src={whiteHeart}
      alt="heart"
      className="s-clickable-icon"
      onClick={handleVote}
    ></img>
  );
  const redHeartIcon = (
    <img
      src={redHeart}
      alt="heart"
      className="s-clickable-icon"
      onClick={handleUnvote}
    ></img>
  );
  const whiteBookMarkIcon = (
    <img
      src={whiteBookMark}
      alt="book mark"
      className="s-clickable-icon"
      onClick={handleRead}
    ></img>
  );
  const blueBookMarkIcon = (
    <img
      src={blueBookMark}
      alt="book mark"
      className="s-clickable-icon"
      onClick={handleUnread}
    ></img>
  );
  const editIcon = (
    <img
      src={edit}
      alt="edit mark"
      className="s-clickable-icon"
      onClick={() => {
        setIsEditing(true);
      }}
    ></img>
  );
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
  const deleteIcon = (
    <img
      src={deleteImg}
      alt="delete icon"
      className="s-clickable-icon"
      onClick={handleDeleteBook}
    ></img>
  );
  const addMetadataIcon = (
    <img
      src={addMetadataImg}
      alt="add icon"
      className="s-clickable-icon"
      onClick={() => {
        setIsAddingMetadata((prev) => !prev);
      }}
    ></img>
  );
  const voterTags = (voters: User[]) => {
    const voterTags =
      voters != undefined
        ? voters.map((voter) => {
            const redTag = (
              <span
                className="voter-tag s-border font-white pastel-red"
                key={voter.id}
              >
                {voter.name}
              </span>
            );
            const whiteTag = (
              <span className="voter-tag s-border font-black" key={voter.id}>
                {voter.name}
              </span>
            );
            if (props.book.postAuthorId == voter.id) {
              return redTag;
            } else {
              return whiteTag;
            }
          })
        : [];
    return voterTags;
  };
  const readerTags = (readers: User[]) => {
    const voterTags =
      readers != undefined
        ? readers.map((reader) => {
            const redTag = (
              <span
                className="voter-tag s-border font-white pastel-blue"
                key={reader.id}
              >
                {reader.name}
              </span>
            );
            const whiteTag = (
              <span className="voter-tag s-border font-black" key={reader.id}>
                {reader.name}
              </span>
            );
            if (props.book.postAuthorId == reader.id) {
              return redTag;
            } else {
              return whiteTag;
            }
          })
        : [];
    return voterTags;
  };
  async function handleVote() {
    try {
      setIsVotable(false);
      await BookRepo.voteOnBook(props.loadingSetter, props.book.id);
      setIsVotable(true);
      setSuccess(props.successIsActiveSetter);
      setVoters((prevVoters) => {
        return prevVoters != undefined ? [...prevVoters, user] : [];
      });
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  async function handleUnvote() {
    try {
      setIsVotable(false);
      await BookRepo.unvoteOnBook(props.loadingSetter, props.book.id);
      setIsVotable(true);
      setSuccess(props.successIsActiveSetter);
      setVoters((prevVoters) => {
        return prevVoters != undefined
          ? prevVoters.filter((voter) => {
              return voter.email != user.email;
            })
          : [];
      });
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  async function handleRead() {
    try {
      setIsReadable(false);
      await BookRepo.readBook(props.loadingSetter, props.book.id);
      setIsReadable(true);
      setSuccess(props.successIsActiveSetter);
      setReaders((prevReaders) => {
        return prevReaders != undefined ? [...prevReaders, user] : [];
      });
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  async function handleUnread() {
    try {
      setIsReadable(false);
      await BookRepo.unreadBook(props.loadingSetter, props.book.id);
      setIsReadable(true);
      setSuccess(props.successIsActiveSetter);
      setReaders((prevReaders) => {
        return prevReaders != undefined
          ? prevReaders.filter((reader) => {
              return reader.email != user.email;
            })
          : [];
      });
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  function handleBookDataChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setEditedBookData((prevBookData) => {
      return { ...prevBookData, [event.target.name]: event.target.value };
    });
    console.log(editedBookData)
  }
  async function submitEditedBook() {
    try {
      setIsEditing(false);
      console.log(editedBookData)
      await BookRepo.updateBook(props.loadingSetter, editedBookData);
      setBookData(editedBookData);
      setSuccess(props.successIsActiveSetter);
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  async function handleMarkAsReadByClub() {
    try {
      await BookRepo.markBookAsReadByClub(props.loadingSetter, props.book.id);
      setSuccess(props.successIsActiveSetter);
      props.updatedBooksListSetter((prev) => !prev);
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  async function handleUnmarkAsReadByClub() {
    try {
      await BookRepo.unmarkBookAsReadByClub(props.loadingSetter, props.book.id);
      setSuccess(props.successIsActiveSetter);
      props.updatedBooksListSetter((prev) => !prev);
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  async function handleDeleteBook() {
    try {
      await BookRepo.deleteBook(props.loadingSetter, props.book.id);
      setSuccess(props.successIsActiveSetter);
      props.updatedBooksListSetter((prev) => !prev);
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  return (
    <div className="BookComponent">
      <div className="flex justify-between width-100">
        {!isEditing && (
          <h3 className="Book-title g-font bold font-black">
            {props.book.title}
          </h3>
        )}
        {isEditing && (
          <textarea
            className="book-title-input"
            name="title"
            defaultValue={props.book.title}
            placeholder="novo título"
            onChange={handleBookDataChange}
          />
        )}
        <div className="book-component-icons-container">
          {(!isEditing && isPostAuthor && editIcon) || (isAdmin && editIcon)}
          {!isEditing && voters && isVoted && isVotable && redHeartIcon}
          {!isEditing && voters && !isVoted && isVotable && whiteHeartIcon}
          {!isEditing && readers && isRead && isReadable && blueBookMarkIcon}
          {!isEditing && readers && !isRead && isReadable && whiteBookMarkIcon}
          {isAdmin && !isReadByClub && whiteFolderIcon}
          {isAdmin && isReadByClub && yellowFolderIcon}
          {isAdmin && deleteIcon}
          {isAdmin && isReadByClub && addMetadataIcon}
        </div>
      </div>
      {isEditing && (
        <textarea
          className="book-author-input"
          name="author"
          defaultValue={props.book.author}
          placeholder="novo autor"
          onChange={handleBookDataChange}
        />
      )}
      {!isEditing && (
        <span className="book-author-text">{props.book.author}</span>
      )}
      {isEditing && (
        <textarea
          className="book-description-input"
          name="description"
          defaultValue={props.book.description}
          placeholder="descrição"
          onChange={handleBookDataChange}
        />
      )}
      {!isReadingDescription && props.book.description != "" && (
        <div className="description-container">
          <button
            className="toggle-description-button"
            onClick={() => setIsReadingDescription(true)}
          >
            descrição
          </button>
        </div>
      )}
      {isReadingDescription && (
        <div className="description-container">
          <span className="book-description-text">{props.book.description}</span>
          <button
            className="close-description-button"
            onClick={() => setIsReadingDescription(false)}
          >
            ver menos
          </button>
        </div>
      )}

      {isEditing && (
        <button
          className="vote-tags-container bright-yellow-button"
          onClick={submitEditedBook}
        >
          salvar
        </button>
      )}
      {!isEditing && voters && isVotable && (
        <div className="vote-tags-container flex s-gap">
          {voterTags(voters)}
        </div>
      )}
      {!isEditing && readers && isReadable && (
        <div className="vote-tags-container flex s-gap">
          {readerTags(readers)}
        </div>
      )}
      {isAddingMetadata && (
        <PostBookMetadata
          loadingSetter={props.loadingSetter}
          errorIsActiveSetter={props.errorIsActiveSetter}
          successIsActiveSetter={props.successIsActiveSetter}
          bookData={props.book}
          previousMetadata={props.book.BookMetadata}
          updateBooksListSetter={props.updatedBooksListSetter}
        />
      )}
    </div>
  );
};

export default BookComponent;
