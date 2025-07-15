import type { AxiosResponse } from "axios";
import api from ".";
import type { Message } from "@/model/Message";

class MessageServiceClass {
  async getMessages(count: number): Promise<Message[]> {
    try {
      const { data }: AxiosResponse["data"] = await api.get(
        `messages?count=${count}`
      );
      return data.data;
    } catch (e) {
      console.error("Error fetching posts:", e);
      return [];
    }
  }
}

export const MessageService = new MessageServiceClass();
