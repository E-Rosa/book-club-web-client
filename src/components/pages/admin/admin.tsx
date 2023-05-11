import {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import UserRepo from "../../../api/repository/userRepo";
import { User } from "../../../api/interfaces/interfaces";
import SignupRequest from "./signupRequest/signupRequest";
import "./admin.css";
import BookRepo from "../../../api/repository/bookRepo";
import { setError } from "../../error/error";
import { setSuccess } from "../../success/success";

interface AdminProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}

const AdminPage: FunctionComponent<AdminProps> = (props) => {
  const [unauthorizedUsersUpdated, setUnauthorizedUsersUpdated] =
    useState(false);
  const [unauthorizedUsers, setUnauthorizedUsers] = useState<User[]>([]);
  const unauthorizedUserComponents = () => {
    return unauthorizedUsers.map(
      (unauthorizedUser: { email: string; name: string }) => {
        return (
          <SignupRequest
            loadingSetter={props.loadingSetter}
            errorIsActiveSetter={props.errorIsActiveSetter}
            successIsActiveSetter={props.successIsActiveSetter}
            user={{
              email: unauthorizedUser.email,
              name: unauthorizedUser.name,
            }}
            unauthorizedUsersUpdatedSetter={setUnauthorizedUsersUpdated}
          />
        );
      }
    );
  };
  useEffect(() => {
    UserRepo.getUnauthorizedUsers(props.loadingSetter).then((users) =>
      setUnauthorizedUsers(users)
    );
  }, [unauthorizedUsersUpdated]);
  return (
    <>
      <div className="AdminPage">
        <div className="admin-nav flex m-gap">
          <button type="button" className="red-button">
            registros
          </button>
          <button
            type="button"
            className="bright-yellow-button"
            onClick={async () => {
              try {
                await BookRepo.updateBookStatistics(props.loadingSetter);
                setSuccess(props.successIsActiveSetter);
              } catch (error){
                console.log(error)
                setError(props.errorIsActiveSetter);
              }
            }}
          >
            atualizar estatisticas
          </button>
        </div>

        <div className="unauthorized-users-timeline">
          {unauthorizedUserComponents()}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
