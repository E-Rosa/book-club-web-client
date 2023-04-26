import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/login";
import "./App.css";
import Loader from "./components/loader/loader";
import Homepage from "./components/pages/home";
import Error from "./components/error/error";
import SignupPage from "./components/pages/signup";

function App() {
  //loading
  const [isLoading, setIsLoading] = useState(false);

  //error
  const [isErrorActive, setIsErrorActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  return (
    <>
      <Loader isLoading={isLoading}></Loader>
      <Error isActive={isErrorActive} message={errorMessage} isActiveSetter={setIsErrorActive}></Error>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<LoginPage loadingSetter={setIsLoading} />}></Route>
          <Route path="/signup" element={<SignupPage loadingSetter={setIsLoading}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
