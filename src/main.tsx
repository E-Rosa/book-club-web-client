import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
/* import { createBrowserRouter} from "react-router-dom"; */
import App from "./App";
/* import LoginPage from "./components/pages/login/login";
//import Loader from "./components/loader/loader";
import Homepage from "./components/pages/home/home";
//import Error from "./components/error/error";
import SignupPage from "./components/pages/signup/signup";
//import Success from "./components/success/success";
import NewBookPage from "./components/pages/postBook/postBook"; */

/* //loading
const [isLoading, setIsLoading] = useState(false);

//error
const [isErrorActive, setIsErrorActive] = useState(false);

//success
const [isSuccessActive, setIsSuccessActive] = useState(false); */

/* const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginPage
        loadingSetter={setIsLoading}
        errorIsActiveSetter={setIsErrorActive}
        successIsActiveSetter={setIsSuccessActive}
      />
    ),
  },
  {
    path: "/home",
    element: (
      <Homepage
        loadingSetter={setIsLoading}
        errorIsActiveSetter={setIsErrorActive}
        successIsActiveSetter={setIsSuccessActive}
      />
    ),
  },
  {
    path: "/signup",
    element: (
      <SignupPage
        loadingSetter={setIsLoading}
        errorIsActiveSetter={setIsErrorActive}
        successIsActiveSetter={setIsSuccessActive}
      />
    ),
  },
  {
    path: "/books/post",
    element: (
      <NewBookPage
        loadingSetter={setIsLoading}
        errorIsActiveSetter={setIsErrorActive}
        successIsActiveSetter={setIsSuccessActive}
      />
    ),
  },
]); */
/* console.log(router) */

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
