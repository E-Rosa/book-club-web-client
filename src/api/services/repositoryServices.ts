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
        return await tryFunction(loadingSetter);
      } catch {
        console.log("attempted to fetch " + (retries + 1) + " times");
        retries++;
      }
    }
    throw new Error("failed to fetch data after 3 retries");
  }
}

export default RepositoryServices;
