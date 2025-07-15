import type { Request, Response, RequestHandler } from "express";
import {
  messagesRepository,
  type MessagesRepository,
} from "../repositories/messages.repository.js";

class MessagesControllerImpl {
  private repository: MessagesRepository;
  constructor(repository: MessagesRepository) {
    this.repository = repository;
    console.log(repository);
  }

  public getMessages: RequestHandler = async (_req: Request, res: Response) => {
    console.log("THIS", this);
    const messages = await this.repository.getAllMessages();
    res.json({
      data: messages,
    });
    return;
  };
}

export const MessagesController = new MessagesControllerImpl(
  messagesRepository
);
