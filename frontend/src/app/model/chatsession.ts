import {Person} from "./person";


export class ChatSession {

    name: string;

    participants: Person[] = [];


    constructor(name: string) {
        this.name = name;
    }
}