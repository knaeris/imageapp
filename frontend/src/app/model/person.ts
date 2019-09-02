import {Message} from "./message";

export class Person{

    id: number;

    name: string;

    imageUrl: string;

    subscribedMessages: Set<Message> = new Set();


    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}