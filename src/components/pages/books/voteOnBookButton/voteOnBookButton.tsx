import { FunctionComponent, useState, Dispatch, SetStateAction } from "react";
import { Book, User } from "../../../../api/interfaces/interfaces";
import whiteHeartImg from "../../../../assets/heart-white.png";
import redHeartImg from "../../../../assets/heart-red.png";
import BookRepo from "../../../../api/repository/bookRepo";
import { setError } from "../../../error/error";
import { setSuccess } from "../../../success/success";

interface VoteOnBookButtonProps {
  bookData: Book;
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  updatedBooksListSetter: Dispatch<SetStateAction<boolean>>;
}
const VoteOnBookButton: FunctionComponent<VoteOnBookButtonProps> = (props) => {
  //responsibility: handle logic for voting on a book
  const user: User = JSON.parse(window.sessionStorage.getItem("user") as string);
  const userVoted = props.bookData.voters ? props.bookData.voters.map(voter=>voter.email).includes(user.email) : false
  const [isClickable, setIsClickable] = useState(true);
  async function handleVote() {
    try {
      setIsClickable(false);
      await BookRepo.voteOnBook(props.loadingSetter, props.bookData.id);
      setIsClickable(true);
      setSuccess(props.successIsActiveSetter);
      props.updatedBooksListSetter(prev=>!prev)
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  async function handleUnvote() {
    try {
      setIsClickable(false);
      await BookRepo.unvoteOnBook(props.loadingSetter, props.bookData.id);
      setIsClickable(true);
      setSuccess(props.successIsActiveSetter);
      props.updatedBooksListSetter(prev=>!prev)
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  const whiteHeartIcon = (
    <img
      src={whiteHeartImg}
      alt="heart"
      className="s-clickable-icon"
      onClick={handleVote}
    ></img>
  );
  const redHeartIcon = (
    <img
      src={redHeartImg}
      alt="heart"
      className="s-clickable-icon"
      onClick={handleUnvote}
    ></img>
  );
  return <>
    {isClickable && userVoted && !props.bookData.isRead && redHeartIcon}
    {isClickable && !userVoted && !props.bookData.isRead && whiteHeartIcon}
  </>;
};

export default VoteOnBookButton;
