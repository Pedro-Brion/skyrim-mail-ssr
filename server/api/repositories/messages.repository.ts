import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

type Message = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

export interface MessagesRepository {
  getAllMessages: () => Promise<Message[]>;
}
class MessagesRepositoryImpl implements MessagesRepository {
  public async getAllMessages(): Promise<Message[]> {
    try {
      const db = fs.readFileSync(
        path.resolve(__dirname, "../../data/messages.json"),
        "utf-8"
      );
      return JSON.parse(db);
    } catch (e) {
      console.error("Error fetching posts:", e);
      return [];
    }
  }
}

export const messagesRepository = new MessagesRepositoryImpl();
