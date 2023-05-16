import { Dispatch, SetStateAction, useContext } from "react";
import { UserMessageContext } from "../../App";

class RepositoryServices {
  static async fetchAndRetry(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    tryFunction: Function
  ) {
    let retries = 0;
    loadingSetter(true);
    while (retries < 3) {
      try {
        const requestResult = await tryFunction()
        if(requestResult){
          loadingSetter(false)
        }
        return requestResult
      } catch (error){
        console.log("attempted to fetch " + (retries + 1) + " times");
        retries++;
        if(retries == 3){
          loadingSetter(false)
        }
      }
    }
    throw new Error("contato com o servidor falhou três vezes");
  }
}

export default RepositoryServices;
