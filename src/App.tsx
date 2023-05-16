import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/authentication/login/login";
import "./App.css";
import "./styles/globals.css";
import "./index.css";
import Loader from "./components/loader/loader";
import BookPage from "./components/pages/books/books";
import Error, { setError } from "./components/error/error";
import SignupPage from "./components/pages/authentication/signup/signup";
import Success, { setSuccess } from "./components/success/success";
import AdminPage from "./components/pages/admin/admin";
import Nav from "./components/nav/nav";
import MeetingsPage from "./components/pages/meetings/meetings";
import StatisticsPage from "./components/pages/statistics/statistics";

const UserMessageContext = createContext({
  success: ()=>{},
  error: ()=>{},
  loading: (value: boolean)=>{console.log(value)}
})

function App() {

  //loading
  const [isLoading, setIsLoading] = useState(false);

  //error
  const [isErrorActive, setIsErrorActive] = useState(false);

  //success
  const [isSuccessActive, setIsSuccessActive] = useState(false);

  return (
    <>
    <UserMessageContext.Provider value={
      {
        success: ()=>{setSuccess(setIsSuccessActive)},
        error: ()=>{setError(setIsErrorActive)},
        loading: (value: boolean)=>{setIsLoading(value)}
    }
    }>
      <Loader isLoading={isLoading} />
      <Error isActive={isErrorActive} isActiveSetter={setIsErrorActive} />
      <Success isActive={isSuccessActive} />
      <Nav />
      <Routes>
        <Route
          path="*"
          element={
            <LoginPage
              loadingSetter={setIsLoading}
              errorIsActiveSetter={setIsErrorActive}
              successIsActiveSetter={setIsSuccessActive}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupPage
              loadingSetter={setIsLoading}
              errorIsActiveSetter={setIsErrorActive}
              successIsActiveSetter={setIsSuccessActive}
            />
          }
        ></Route>
        <Route
          path="/books"
          element={
            <BookPage
              loadingSetter={setIsLoading}
              errorIsActiveSetter={setIsErrorActive}
              successIsActiveSetter={setIsSuccessActive}
            />
          }
        ></Route>
        <Route
          path="/meetings"
          element={
            <MeetingsPage
              loadingSetter={setIsLoading}
              errorIsActiveSetter={setIsErrorActive}
              successIsActiveSetter={setIsSuccessActive}
            />
          }
        ></Route>
                <Route
          path="/statistics"
          element={
            <StatisticsPage
              loadingSetter={setIsLoading}
              errorIsActiveSetter={setIsErrorActive}
              successIsActiveSetter={setIsSuccessActive}
            />
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <AdminPage
              loadingSetter={setIsLoading}
              errorIsActiveSetter={setIsErrorActive}
              successIsActiveSetter={setIsSuccessActive}
            />
          }
        ></Route>
      </Routes>
      </UserMessageContext.Provider>
    </>
  );
}

export default App;
export{ UserMessageContext}
