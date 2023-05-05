import "../../book/book.css";
import "./postBook.css";
import {
  FunctionComponent,
  SetStateAction,
  Dispatch,
  useState,
  ChangeEvent,
} from "react";
import BookRepo from "../../../api/repository/bookRepo";
import { setError } from "../../error/error";
import { setSuccess } from "../../success/success";
import Nav from "../../nav/nav";
import { Book } from "../../../api/interfaces/interfaces";
import { useNavigate } from "react-router-dom";

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
    description: ""
  });

  function updateBook(event: ChangeEvent<HTMLInputElement>) {
    setNewBookData((prevBookData) => {
      return { ...prevBookData, [event.target.name]: event.target.value };
    });
  }
  const navigate = useNavigate();

  return (
    <div className="NewBookPage">
      <Nav />
      <div className="NewBook">
        <span className="blue-button g-font">Sugira um Livro</span>
        <form
          className="BookComponent"
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              await BookRepo.postBook(props.loadingSetter, newBookData);
              setSuccess(props.successIsActiveSetter);
              setTimeout(() => {
                navigate("/home");
              }, 1000);
            } catch {
              setError(props.errorIsActiveSetter);
            }
          }}
        >
          <input
            type="text"
            className="standard-text-input"
            name="title"
            placeholder="titulo"
            onChange={updateBook}
          />

          <input
            type="text"
            className="standard-text-input"
            name="author"
            placeholder="autor"
            onChange={updateBook}
          />
          <button className="bright-yellow-button" type="submit">
            salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBookPage;
