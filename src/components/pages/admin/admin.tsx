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
import Nav from "../../nav/nav";
import "./admin.css"

interface AdminProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
  successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}

const AdminPage: FunctionComponent<AdminProps> = (props) => {
  useEffect(() => {
    UserRepo.getUnauthorizedUsers(props.loadingSetter).then((users) =>
      setUnauthorizedUsers(users)
    );
  }, []);
  const [unauthorizedUsers, setUnauthorizedUsers] = useState<User[]>([]);
  const unauthorizedUserComponents = () => {
    return unauthorizedUsers.map(
      (unauthorizedUser: { email: string; name: string }) => {
        return <SignupRequest
          loadingSetter={props.loadingSetter}
          errorIsActiveSetter={props.errorIsActiveSetter}
          successIsActiveSetter={props.successIsActiveSetter}
          user={{ email: unauthorizedUser.email, name: unauthorizedUser.name }}
        />;
      }
    );
  };
  return (
    <>
      <Nav />
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
