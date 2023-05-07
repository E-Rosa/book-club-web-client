import { Dispatch, SetStateAction } from "react";
import RepositoryServices from "../services/repositoryServices";
import { endpointURL } from "../../config/db";
import SessionServices from "../services/sessionServices";

class MeetingRepo {
  static async getMeetingsPaginated(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    skip: number
  ){
    try {
        return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
          const response = await fetch(`${endpointURL}/api/meetings/${skip}`, {
            method: "GET",
            headers: {
              authorization: `Bearer ${SessionServices.getSessionToken()}`,
            },
          });
          const parsedResponse = await response.json();
          if (response.status != 200) {
            throw new Error("Não foi possivel carregar reuniões");
          }
          return parsedResponse;
        });
      } catch (error) {
        throw new Error("Não foi possivel carregar reuniões - erro de servidor");
      }
  }
}

export default MeetingRepo;
