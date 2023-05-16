import {
  FunctionComponent,
  SetStateAction,
  Dispatch,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { Book, BookMetadata } from "../../../../api/interfaces/interfaces";
import PostTag from "../tags/postTag/postTag";
import BookRepo from "../../../../api/repository/bookRepo";
import { setError } from "../../../error/error";
import { setSuccess } from "../../../success/success";
import "./bookMetadataForm.css";

interface BookMetadataFormProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  updateBooksListSetter: Dispatch<SetStateAction<boolean>>;
  bookData: Book & { BookMetadata: BookMetadata };
  previousMetadata?: BookMetadata;
}

const BookMetadataFormComponent: FunctionComponent<BookMetadataFormProps> = (
  props
) => {
  const updateMetadata = props.previousMetadata != undefined;
  const postMetadata = props.previousMetadata == undefined;
  const [tagsList, setTagsList] = useState<string[]>(
    props.previousMetadata
      ? props.previousMetadata.tags.map((tag) => tag.name)
      : []
  );
  const [newBookMetadata, setNewBookMetadata] = useState<BookMetadata>(
    props.previousMetadata
      ? props.previousMetadata
      : {
          year: 0,
          pages: 0,
          authorNationality: "",
          authorGender: "",
          tags: [],
        }
  );
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setNewBookMetadata((prevBookData) => {
      return {
        ...prevBookData,
        [event.target.name]: event.target.value,
      } as BookMetadata;
    });
  }
  async function upsertMetadata(event: FormEvent) {
    try {
      event.preventDefault();
      await BookRepo.postBookMetadata(
        props.loadingSetter,
        newBookMetadata as BookMetadata,
        props.bookData.id
      );
      await BookRepo.postTags(props.loadingSetter, tagsList);
      props.updateBooksListSetter((prev) => !prev);
      setSuccess(props.successIsActiveSetter);
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  return (
    <>
      {postMetadata && (
        <form
          onSubmit={upsertMetadata}
          className="BookMetadataForm flex column m-gap"
        >
          <input
            required
            type="text"
            className="standard-text-input"
            name="year"
            placeholder="ano de publicação"
            onChange={handleChange}
          />
          <input
            required
            type="text"
            className="standard-text-input"
            name="authorNationality"
            placeholder="nacionalidade do autor"
            onChange={handleChange}
          />
          <input
            required
            type="text"
            className="standard-text-input"
            name="authorGender"
            placeholder="sexo do autor"
            onChange={handleChange}
          />
          <input
            required
            type="number"
            className="standard-text-input"
            name="pages"
            placeholder="média de paginas"
            onChange={handleChange}
          />
          <PostTag tagsList={tagsList} tagsListSetter={setTagsList} />
          <button type="submit" className="bright-yellow-button">
            enviar
          </button>
        </form>
      )}
      {updateMetadata && (
        <form onSubmit={upsertMetadata} className="BookMetadataForm flex column m-gap">
          <input
            required
            type="text"
            className="standard-text-input"
            name="year"
            placeholder="ano de publicação"
            onChange={handleChange}
            defaultValue={props.bookData.BookMetadata.year}
          />
          <input
            required
            type="text"
            className="standard-text-input"
            name="authorNationality"
            placeholder="nacionalidade do autor"
            onChange={handleChange}
            defaultValue={props.bookData.BookMetadata.authorNationality}
          />
          <input
            required
            type="text"
            className="standard-text-input"
            name="authorGender"
            placeholder="sexo do autor"
            onChange={handleChange}
            defaultValue={props.bookData.BookMetadata.authorGender}
          />
          <input
            required
            type="number"
            className="standard-text-input"
            name="pages"
            placeholder="média de paginas"
            onChange={handleChange}
            defaultValue={props.bookData.BookMetadata.pages}
          />
          <PostTag tagsList={tagsList} tagsListSetter={setTagsList} />
          <button type="submit" className="bright-yellow-button">
            enviar
          </button>
        </form>
      )}
    </>
  );
};

export default BookMetadataFormComponent;
