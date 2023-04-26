import RepositoryServices from "../services/repositoryServices";
import { Dispatch, SetStateAction } from "react";
import { endpointURL } from "../../config/db";
import { SignUpData } from "../interfaces/interfaces";


class UsersRepo {
  static async signup(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    signUpData: SignUpData
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(`${endpointURL}/api/authentication/signup`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(signUpData)
        });
        const parsedResponse = await response.json();
        return parsedResponse;
      });
    } catch {
      console.log("impossible to signup");
    }
  }
  static async getUsers(loadingSetter: Dispatch<SetStateAction<boolean>>) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(`${endpointURL}/users`, { method: "GET" });
        const parsedResponse = await response.json();
        return parsedResponse;
      });
    } catch {
      console.log("impossible to get users");
    }
  }
}

export default UsersRepo;
