import RepositoryServices from "../services/repositoryServices";
import { Dispatch, SetStateAction } from "react";
import { endpointURL } from "../../config/db";

class UsersRepo {
  static async getUsers(loadingSetter: Dispatch<SetStateAction<boolean>>) {
    try{
        return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
            const response = await fetch(`${endpointURL}/users`, { method: "GET" });
            const parsedResponse = await response.json();
            if (parsedResponse) {
              loadingSetter(false);
            }
            return parsedResponse;
          });
    }
    catch{
        console.log("impossible to fetch users")
    }

  }
}

export default UsersRepo