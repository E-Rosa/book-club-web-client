import {
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import UserRepo from "../../../api/repository/userRepo";
import { User } from "../../../api/interfaces/interfaces";
import SignupRequest from "../../signupRequest/signupRequest";
import "./admin.css"

interface AdminProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}

const AdminPage: FunctionComponent<AdminProps> = (props) => {
  const [unauthorizedUsersUpdated, setUnauthorizedUsersUpdated] = useState(false);
  const [unauthorizedUsers, setUnauthorizedUsers] = useState<User[]>([]);
  const unauthorizedUserComponents = () => {
    return unauthorizedUsers.map(
      (unauthorizedUser: { email: string; name: string }) => {
        return <SignupRequest
          loadingSetter={props.loadingSetter}
          errorIsActiveSetter={props.errorIsActiveSetter}
          successIsActiveSetter={props.successIsActiveSetter}
          user={{ email: unauthorizedUser.email, name: unauthorizedUser.name }}
          unauthorizedUsersUpdatedSetter={setUnauthorizedUsersUpdated}
        />;
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
        <div className="admin-nav">
          <button type="button" className="red-button">
            registros
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
