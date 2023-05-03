import RepositoryServices from "../services/repositoryServices";
import { Dispatch, SetStateAction } from "react";
import { endpointURL } from "../../config/db";
import { SignUpData, LoginData } from "../interfaces/interfaces";

class UserRepo {
  static async signup(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    signUpData: SignUpData
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(
          `${endpointURL}/api/authentication/signup`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(signUpData),
          }
        );
        const parsedResponse = await response.json();
        if(response.status != 200){
          throw new Error("cadastro falhou")
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("cadastro falhou - erro de servidor")
    }
  }
  static async login(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    loginData: LoginData
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(
          `${endpointURL}/api/authentication/login`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(loginData),
          }
        );
        const parsedResponse = await response.json();
        if(response.status != 200){
          throw new Error("login falhou")
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("login falhou")
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
  static async requestSignup(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    signUpData: SignUpData
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(
          `${endpointURL}/api/authentication/signup/request`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(signUpData),
          }
        );
        const parsedResponse = await response.json();
        if(response.status != 200){
          throw new Error("pedido de cadastro falhou")
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("pedido de cadastro falhou - erro de servidor")
    }
  }
}

export default UserRepo;
