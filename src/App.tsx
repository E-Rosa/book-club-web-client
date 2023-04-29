import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/login/login";
import "./App.css";
import "./styles/globals.css";
import Loader from "./components/loader/loader";
import Homepage from "./components/pages/home/home";
import Error from "./components/error/error";
import SignupPage from "./components/pages/signup/signup";
import Success from "./components/success/success";
import NewBookPage from "./components/pages/postBook/postBook";

function App() {
  window.onbeforeunload = ()=>{window.location.href="https://book-club-web-client.vercel.app/"}

  //loading
  const [isLoading, setIsLoading] = useState(false);

  //error
  const [isErrorActive, setIsErrorActive] = useState(false);

  //success
  const [isSuccessActive, setIsSuccessActive] = useState(false);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Error
        isActive={isErrorActive}
        isActiveSetter={setIsErrorActive}
      />
      <Success isActive={isSuccessActive} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <Homepage
                loadingSetter={setIsLoading}
                errorIsActiveSetter={setIsErrorActive}
                successIsActiveSetter={setIsSuccessActive}
              />
            }
          ></Route>
          <Route
            path="/"
            element={
              <LoginPage
                loadingSetter={setIsLoading}
                errorIsActiveSetter={setIsErrorActive}
                successIsActiveSetter={setIsSuccessActive}
              />
            }
          ></Route>
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
            path="/books/post"
            element={
              <NewBookPage
                loadingSetter={setIsLoading}
                errorIsActiveSetter={setIsErrorActive}
                successIsActiveSetter={setIsSuccessActive}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
