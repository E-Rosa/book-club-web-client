import { Dispatch, SetStateAction } from "react";
import RepositoryServices from "../services/repositoryServices";
import { endpointURL } from "../../config/db";
import SessionServices from "../services/sessionServices";
import { Meeting } from "../interfaces/interfaces";

class MeetingRepo {
  static async getMeetingsPaginated(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    skip: number
  ) {
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
  static async postMeeting(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    meetingData: Meeting
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(`${endpointURL}/api/meetings/`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${SessionServices.getSessionToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(meetingData),
        });
        const parsedResponse = await response.json();
        if (response.status != 200) {
          throw new Error("Não foi possivel postar reuniões");
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("Não foi possivel postar reuniões - erro de servidor");
    }
  }
  static async putMeeting(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    newMeetingData: Meeting
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(`${endpointURL}/api/meetings/${newMeetingData.id}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${SessionServices.getSessionToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMeetingData),
        });
        const parsedResponse = await response.json();
        if (response.status != 200) {
          throw new Error("Não foi possivel postar reuniões");
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("Não foi possivel postar reuniões - erro de servidor");
    }
  }
  static async deleteMeeting(
    loadingSetter: Dispatch<SetStateAction<boolean>>,
    meetingId: string
  ) {
    try {
      return await RepositoryServices.fetchAndRetry(loadingSetter, async () => {
        const response = await fetch(`${endpointURL}/api/meetings/${meetingId}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${SessionServices.getSessionToken()}`,
          },
        });
        const parsedResponse = await response.json();
        if (response.status != 200) {
          throw new Error("Não foi possivel deletar reunião");
        }
        return parsedResponse;
      });
    } catch (error) {
      throw new Error("Não foi possivel deletar reunião- erro de servidor");
    }
  }
}

export default MeetingRepo;
