import { proto, MessageUpsertType } from "@adiwajshing/baileys";
import { connect } from "../../connection";

export interface IMessage {
  messages: proto.IWebMessageInfo[];
  type: MessageUpsertType;
}

export declare class Command {
  command: string;
  alias?: string;
  pattern: RegExp;
  description: string;
  execute: typeof executeFunction;
}

export declare function executeFunction(socket: any, message: IMessage): void;

export declare const socketObject: Awaited<ReturnType<typeof connect>>;
