import { FunctionComponent, Dispatch, SetStateAction } from "react";


interface AdminProps {
    loadingSetter: Dispatch<SetStateAction<boolean>>;
    errorIsActiveSetter: Dispatch<SetStateAction<boolean>>;
    successIsActiveSetter: Dispatch<SetStateAction<boolean>>;
}

const AdminPage: FunctionComponent<AdminProps> = () => {
  return (
    <>

    </>
  );
};

export default AdminPage;
