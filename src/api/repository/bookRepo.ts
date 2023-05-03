import { Dispatch, SetStateAction } from "react";
import RepositoryServices from "../services/repositoryServices";
import { endpointURL } from "../../config/db";
import SessionServices from "../services/sessionServices";
import { Book } from "../interfaces/interfaces";

class BookRepo {
  static async getSuggestedBooks(
    loadingSetter: Dispatch<SetStateAction<boolean>>
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(`${endpointURL}/api/books/suggested`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${SessionServices.getSessionToken()}`,
          },
        });
        const parsedResponse = await response.json();
        if (response.status != 200) {
          throw new Error("Não foi possivel carregar livros");
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("Não foi possivel carregar livros - erro de servidor");
    }
  }
  static async getReadBooks(loadingSetter: Dispatch<SetStateAction<boolean>>) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(`${endpointURL}/api/books/read`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${SessionServices.getSessionToken()}`,
          },
        });
        const parsedResponse = await response.json();
        if (response.status != 200) {
          throw new Error("Não foi possivel carregar livros");
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("Não foi possivel carregar livros - erro de servidor");
    }
  }
  static async voteOnBook(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    bookId: string
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(
          `${endpointURL}/api/books/vote/${bookId}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${SessionServices.getSessionToken()}`,
            },
          }
        );
        const parsedResponse = await response.json();
        if (response.status != 200) {
          throw new Error("Não foi possivel votar");
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("Não foi possivel votar - erro de servidor");
    }
  }
  static async unvoteOnBook(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    bookId: string
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(
          `${endpointURL}/api/books/unvote/${bookId}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${SessionServices.getSessionToken()}`,
            },
          }
        );
        const parsedResponse = await response.json();
        if (response.status != 200) {
          throw new Error("Não foi possivel cancelar voto");
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("Não foi possivel cancelar voto - erro de servidor");
    }
  }
  static async postBook(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    book: Book
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(`${endpointURL}/api/books/`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${SessionServices.getSessionToken()}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(book),
        });
        const parsedResponse = await response.json();
        if (response.status != 200) {
          throw new Error("Não foi possivel sugerir livro");
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("Não foi possivel sugerir livro - erro de servidor");
    }
  }
  static async readBook(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    bookId: string
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(
          `${endpointURL}/api/books/read/${bookId}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${SessionServices.getSessionToken()}`,
            },
          }
        );
        const parsedResponse = await response.json();
        if (response.status != 200) {
          throw new Error("Não foi possivel votar");
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("Não foi possivel votar - erro de servidor");
    }
  }
  static async unreadBook(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    bookId: string
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(
          `${endpointURL}/api/books/unread/${bookId}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${SessionServices.getSessionToken()}`,
            },
          }
        );
        const parsedResponse = await response.json();
        if (response.status != 200) {
          throw new Error("Não foi possivel cancelar voto");
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("Não foi possivel cancelar voto - erro de servidor");
    }
  }
  static async updateBook(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    book: Book
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(`${endpointURL}/api/books/`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${SessionServices.getSessionToken()}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(book),
        });
        const parsedResponse = await response.json();
        if (response.status != 200) {
          throw new Error("Não foi possivel atualizar livro");
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("Não foi possivel atualizar livro - erro de servidor");
    }
  }
}

export default BookRepo;
