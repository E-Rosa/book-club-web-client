import { useEffect, useState } from "react";
import UsersRepo from "./api/repository/usersRepo";
import "./App.css";
import Loader from "./components/loader/loader";

function App() {
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    UsersRepo.getUsers(setIsLoading)
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Loader isLoading={isLoading}></Loader>
      <p>my users are: {JSON.stringify(users)}</p>
    </>
  );
}

export default App;
