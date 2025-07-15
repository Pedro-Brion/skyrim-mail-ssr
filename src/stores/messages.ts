import { MessageService } from "@/api/Message";
import * as Message from "@/model/Message";

export const useMessagesStore = defineStore("messages", () => {
  const messages = ref<Message.Message[]>([]);

  const fetchMessages = async (count: number = 5) => {
    messages.value = await MessageService.getMessages(count);
  };
  return { messages, fetchMessages };
});
