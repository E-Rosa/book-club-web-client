import { Dispatch, SetStateAction } from "react";

class RepositoryServices {
  static async fetchAndRetry(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    tryFunction: Function
  ) {
    let retries = 0;
    loadingSetter(true);
    while (retries < 3) {
      try {
        const requestResult = await tryFunction(loadingSetter)
        if(requestResult){
          loadingSetter(false)
        }
        return requestResult
      } catch {
        console.log("attempted to fetch " + (retries + 1) + " times");
        retries++;
        if(retries == 3){
          loadingSetter(false)
        }
      }
    }
    throw new Error("failed to fetch data after 3 retries");
  }
}

export default RepositoryServices;
