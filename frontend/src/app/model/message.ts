import {Person} from "./person";

export class Message {

    payload: string;
    sender: Person;


    constructor(content: string, sender: Person) {
        this.payload = content;
        this.sender = sender;

    }
}