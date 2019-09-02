import {Person} from "./person";


export class ChatSession {

    name: string;

    participants: Set<Person>


    constructor(name: string) {
        this.name = name;
    }
}