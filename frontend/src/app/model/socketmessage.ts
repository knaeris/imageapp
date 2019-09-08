import {Operationenum} from "./operationenum";
import {Person} from "./person";
import {Message} from "./message";

export class Socketmessage{
    operation: Operationenum;
    objectJSON: any;


    constructor(message: string) {
        if(!message){
            return;
        }
        this.operation = JSON.parse(message).operation;
        let objectJSONString = JSON.parse(message).objectJSON;
        if(objectJSONString){
            this.objectJSON = JSON.parse(objectJSONString);
        }
    }
}