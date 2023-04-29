import {
  FunctionComponent,
  MouseEvent,
  SetStateAction,
  Dispatch,
  useState,
} from "react";
import { Book, User } from "../../api/interfaces/interfaces";
import whiteHeart from "../../assets/heart-white.png";
import redHeart from "../../assets/heart-red.png";
import "./book.css";
import BookRepo from "../../api/repository/bookRepo";
import { setError } from "../error/error";
import { setSuccess } from "../success/success";

interface BookComponentProps {
  book: Book;
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  //domUpdateSetter: Dispatch<SetStateAction<boolean>>;
}

const BookComponent: FunctionComponent<BookComponentProps> = (props) => {
  const [voters, setVoters] = useState(props.book.voters);
  const [isVotable, setIsVotable] = useState(true)
  const user = JSON.parse(window.sessionStorage.getItem("user") as string);
  const [voterEmails, setVoterEmails] = useState(
    voters.map((vote) => {
      return vote.email;
    })
  );
  const isVoted = voterEmails.includes(user.email);
  const whiteHeartIcon = (
    <img
      src={whiteHeart}
      alt="heart"
      className="heart"
      onClick={handleVote}
    ></img>
  );
  const redHeartIcon = (
    <img
      src={redHeart}
      alt="heart"
      className="heart"
      onClick={handleUnvote}
    ></img>
  );
  const voterTags = (voters: User[]) => {
    const voterTags = voters.map((voter) => {
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
    });
    return voterTags
  };
  const heart = (userEmail: string, voters: User[]) => {
    const whiteHeartIcon = (
      <img
        src={whiteHeart}
        alt="heart"
        className="heart"
        onClick={handleVote}
      ></img>
    );
    const redHeartIcon = (
      <img
        src={redHeart}
        alt="heart"
        className="heart"
        onClick={handleUnvote}
      ></img>
    );
    const voterEmails = voters.map((vote) => {
      return vote.email;
    });
    return voterEmails.includes(userEmail) ? redHeartIcon : whiteHeartIcon;
  };
  async function handleVote(event: MouseEvent<HTMLImageElement>) {
    try {
      setIsVotable(false)
      const votedBook = await BookRepo.voteOnBook(
        props.loadingSetter,
        props.book.id
      );
      setIsVotable(true)
      setSuccess(props.successIsActiveSetter);
      setVoterEmails((prevVoterEmails) => {
        return [...prevVoterEmails, user.email];
      });
      setVoters((prevVoters) => {
        return [
          ...prevVoters,
          { id: user.id, email: user.email, name: user.name },
        ];
      });
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  async function handleUnvote(event: MouseEvent<HTMLImageElement>) {
    try {
      setIsVotable(false)
      const unvotedBook = await BookRepo.unvoteOnBook(
        props.loadingSetter,
        props.book.id
      );
      setIsVotable(true)
      setSuccess(props.successIsActiveSetter);
      setVoterEmails((prevVoterEmails) => {
        return prevVoterEmails.filter((email) => {
          return email != user.email;
        });
      });
      setVoters((prevVoters) => {
        return prevVoters.filter((voter) => {
          return voter.email != user.email;
        });
      });
    } catch (error) {
      setError(props.errorIsActiveSetter);
    }
  }
  return (
    <div className="BookComponent">
      <div className="flex justify-between width-100">
        <h3 className="Book-title g-font bold font-black">{props.book.title}</h3>

        {isVoted && isVotable && redHeartIcon}
        {!isVoted && isVotable && whiteHeartIcon}
        {/* {heart(window.sessionStorage.getItem("email") as string, props.book.voters)} */}
      </div>

      <span>{props.book.author}</span>
      <div className="vote-tags-container flex s-gap">{voterTags(voters)}</div>
    </div>
  );
};

export default BookComponent;
