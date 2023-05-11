import "../books.css";
import "./postBook.css";
import {
  FunctionComponent,
  SetStateAction,
  Dispatch,
  useState,
  ChangeEvent,
} from "react";
import BookRepo from "../../../../api/repository/bookRepo";
import { setError } from "../../../error/error";
import { setSuccess } from "../../../success/success";
import { Book, BookMetadata } from "../../../../api/interfaces/interfaces";

interface BookComponentProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  //domUpdateSetter: Dispatch<SetStateAction<boolean>>;
}

const NewBookPage: FunctionComponent<BookComponentProps> = (props) => {
  const user = JSON.parse(window.sessionStorage.getItem("user") as string);
  const [newBookData, setNewBookData] = useState<Book>({
    title: "",
    author: "",
    id: "",
    postAuthorId: user.id,
    voters: [user],
    readers: [],
    isRead: false,
    description: "",
  });
  const [newBookMetadata, setNewBookMetadata] = useState<BookMetadata>();
  const [includeMetadata, setIncludeMetadata] = useState<boolean>(false);
  function updateBook(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setNewBookData((prevBookData) => {
      return { ...prevBookData, [event.target.name]: event.target.value };
    });
  }

  function updateBookMetadata(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setNewBookMetadata((prevBookData) => {
      return {
        ...prevBookData,
        [event.target.name]: event.target.value,
      } as BookMetadata;
    });
  }

  return (
    <div className="NewBookPage">
      <div className="NewBook">
        <span className="blue-button g-font">Sugira um Livro</span>
        <form
          className="BookComponent"
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              const newBook = await BookRepo.postBook(props.loadingSetter, newBookData);
              if (includeMetadata) {
                await BookRepo.postBookMetadata(
                  props.loadingSetter,
                  newBookMetadata as BookMetadata,
                  newBook.id as string
                );
              }
              setSuccess(props.successIsActiveSetter);
            } catch {
              setError(props.errorIsActiveSetter);
            }
          }}
        >
          <input
            type="text"
            className="standard-text-input wide"
            name="title"
            placeholder="titulo"
            onChange={updateBook}
            required
          />

          <input
            type="text"
            className="standard-text-input wide"
            name="author"
            placeholder="autor"
            onChange={updateBook}
            required
          />
          <textarea
            className="standard-text-input wide description-input"
            name="description"
            placeholder="descrição"
            onChange={updateBook}
            required
          />
          <div className="standard-checkbox-with-label wide">
            <input
              type="checkbox"
              onChange={() => setIncludeMetadata((prev) => !prev)}
            />
            <span>incluir dados para estatísticas</span>
          </div>

          {includeMetadata && (
            <>
              <input
                required
                type="text"
                className="standard-text-input wide"
                name="year"
                placeholder="ano de publicação"
                onChange={updateBookMetadata}
              />
              <input
                required
                type="text"
                className="standard-text-input wide"
                name="authorNationality"
                placeholder="nacionalidade do autor"
                onChange={updateBookMetadata}
              />
              <input
                required
                type="text"
                className="standard-text-input wide"
                name="authorGender"
                placeholder="sexo do autor"
                onChange={updateBookMetadata}
              />
              <input
                required
                type="number"
                className="standard-text-input wide"
                name="pages"
                placeholder="média de paginas"
                onChange={updateBookMetadata}
              />
            </>
          )}
          <button className="bright-yellow-button" type="submit">
            salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBookPage;
