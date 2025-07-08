import { AxiosResponse } from "axios";
import api from ".";
import { Message } from "@/model/Message";
class MessageServiceClass {
  async getMessages(count: number): Promise<Message[]> {
    try {
      const response: AxiosResponse = import.meta.env.SSR
        ? await api.get(
            `https://jsonplaceholder.typicode.com/posts?_limit=${count}`
          )
        : await api.get(`api/messages?count=${count}`);
      return response.data;
    } catch (e) {
      console.error("Error fetching posts:", e);
      return [];
    }
  }
}

export const MessageService = new MessageServiceClass();
