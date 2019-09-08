import {Message} from "./message";
import {Operationenum} from "./operationenum";
import {Websocketmessage} from "./websocketmessage";


export class Person implements Websocketmessage{

    id: number;

    name: string;

    imageUrl: string;

    subscribedMessages: Message[] = [];


    constructor(name: string) {
        this.name = name;
    }


}