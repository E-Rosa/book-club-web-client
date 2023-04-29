import "../../book/book.css";
import "./postBook.css"
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
import { redirect } from "react-router-dom";


interface BookComponentProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  //domUpdateSetter: Dispatch<SetStateAction<boolean>>;
}

const NewBookPage: FunctionComponent<BookComponentProps> = (props) => {
  const user = JSON.parse(window.sessionStorage.getItem("user") as string);
  const [newBookData, setNewBookData] = useState<Book>({title:"", author: "", voters:[user], id: "", postAuthorId: user.id})

  function updateBook(event: ChangeEvent<HTMLInputElement>){
    setNewBookData((prevBookData)=>{
        return {...prevBookData, [event.target.name]: event.target.value}
    })
  } 

  return (
    <div className="NewBookPage">
      <Nav />
      <div className="NewBook">
        <span className="g-font s-padding-top m-padding-sides pastel-blue s-border s-shadow font-white bold text-align-center">
          Sugira um Livro
        </span>
        <form className="BookComponent" onSubmit={async (event)=>{
            try{
                event.preventDefault();
                await BookRepo.postBook(props.loadingSetter, newBookData);
                setSuccess(props.successIsActiveSetter)
                setTimeout(()=>{redirect("/home")}, 1000)
            }
            catch{
                setError(props.errorIsActiveSetter)
            }
            
        }}>
          <input
            type="text"
            className="Book-title s-font bold font-black s-padding-top m-padding-sides s-shadow s-border"
            name="title"
            placeholder="titulo"
            onChange={updateBook}
          />

          <input
            type="text"
            className="NewBookPage-input s-font s-padding-top m-padding-sides s-shadow s-border"
            name="author"
            placeholder="autor"
            onChange={updateBook}
          />
          <button
            className="s-padding-top m-padding-sides s-shadow s-border bright-yellow s-font"
            type="submit"
          >
            salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBookPage;
