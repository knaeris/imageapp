import {Message} from "./message";
import {Operationenum} from "./operationenum";
import {Websocketmessage} from "./websocketmessage";


export class Person implements Websocketmessage{

    operation: Operationenum;

    id: number;

    name: string;

    imageUrl: string;

    subscribedMessages: Message[] = [];


    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    getOperation(): Operationenum {
        return this.operation;
    }


}