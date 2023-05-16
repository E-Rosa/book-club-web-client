import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { Book } from "../../../../api/interfaces/interfaces";
import BookRepo from "../../../../api/repository/bookRepo";
import { setSuccess } from "../../../success/success";
import { setError } from "../../../error/error";

interface BookFormProps {
  updateBook?: boolean;
  insertBook?: boolean;
  previousBookData?: Book;
  updateBooksListSetter?: Dispatch<SetStateAction<boolean>>;
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}

const BookFormComponent: FunctionComponent<BookFormProps> = (props) => {
  //responsibility: display a form to update or insert a new book
  const user = JSON.parse(window.sessionStorage.getItem("user") as string);
  const [newBookData, setNewBookData] = useState<Book>(
    props.previousBookData
      ? props.previousBookData
      : {
          title: "",
          author: "",
          id: "",
          postAuthorId: user.id,
          voters: [user],
          readers: [],
          isRead: false,
          description: "",
        }
  );
  function updateBookState(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setNewBookData((prevBookData) => {
      return { ...prevBookData, [event.target.name]: event.target.value };
    });
  }
  async function postBook(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      await BookRepo.postBook(props.loadingSetter, newBookData);
      setSuccess(props.successIsActiveSetter);
    } catch {
      setError(props.errorIsActiveSetter);
    }
  }
  async function putBook(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      await BookRepo.updateBook(props.loadingSetter, newBookData);
      setSuccess(props.successIsActiveSetter);
      if(props.updateBooksListSetter){
        props.updateBooksListSetter(prev=>!prev)
      }
    } catch {
      setError(props.errorIsActiveSetter);
    }
  }
  return (
    <>
      <div className="">
        {props.insertBook && (
          <div className="NewBook">
            <span className="blue-button g-font">Sugira um Livro</span>
            <form className="BookComponent" onSubmit={postBook}>
              <input
                type="text"
                className="standard-text-input wide"
                name="title"
                placeholder="titulo"
                onChange={updateBookState}
                required
              />

              <input
                type="text"
                className="standard-text-input wide"
                name="author"
                placeholder="autor"
                onChange={updateBookState}
                required
              />
              <textarea
                className="standard-text-input wide description-input"
                name="description"
                placeholder="descrição"
                onChange={updateBookState}
                required
              />
              <button className="bright-yellow-button" type="submit">
                salvar
              </button>
            </form>
          </div>
        )}
        {props.updateBook && props.previousBookData && (
          <div className="NewBook">
            <span className="blue-button g-font">Sugira um Livro</span>
            <form className="BookComponent" onSubmit={putBook}>
              <input
                type="text"
                className="standard-text-input wide"
                name="title"
                placeholder="titulo"
                onChange={updateBookState}
                required
                defaultValue={props.previousBookData.title}
              />

              <input
                type="text"
                className="standard-text-input wide"
                name="author"
                placeholder="autor"
                defaultValue={props.previousBookData.author}
                onChange={updateBookState}
                required
              />
              <textarea
                className="standard-text-input wide description-input"
                name="description"
                placeholder="descrição"
                onChange={updateBookState}
                defaultValue={props.previousBookData.description}
                required
              />
              <button className="bright-yellow-button" type="submit">
                salvar
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default BookFormComponent;
