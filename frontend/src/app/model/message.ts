import {Person} from "./person";
import {Operationenum} from "./operationenum";
import {Websocketmessage} from "./websocketmessage";


export class Message implements Websocketmessage{

    payload: string;
    sender: Person;


    constructor(content: string, sender: Person) {
        this.payload = content;
        this.sender = sender;
    }

}