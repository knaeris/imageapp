import {Person} from "./person";
import {ChatSession} from "./chatsession";

export class Message {
    id: bigint;
    content: string;
    isSent: boolean;
    sentBy: Person;
    session: ChatSession;


    constructor(content: string, sentBy: Person) {
        this.content = content;
        this.sentBy = sentBy;
    }
}