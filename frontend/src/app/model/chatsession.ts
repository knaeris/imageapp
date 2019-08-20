import {Person} from "./person";
import {Message} from "./message";

export class ChatSession {

    name: string;

    isPublic: boolean;

    participants: Set<Person>;

    chatLog: Set<Message>;
}