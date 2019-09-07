import {Person} from "./person";
import {Operationenum} from "./operationenum";
import {Websocketmessage} from "./websocketmessage";


export class Message implements Websocketmessage{

    operation: Operationenum;
    payload: string;
    sender: Person;


    constructor(content: string, sender: Person, operation: Operationenum) {
        this.payload = content;
        this.sender = sender;
        this.operation = operation;
    }

    getOperation(): Operationenum {
        return this.operation;
    }
}