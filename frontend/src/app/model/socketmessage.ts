import {Operationenum} from "./operationenum";
import {Person} from "./person";
import {Message} from "./message";

export class Socketmessage{
    operation: Operationenum;
    payload: any;


    constructor(message: string) {
        if(!message){
            return;
        }
        this.operation = JSON.parse(message).operation;
        let payloadString = JSON.parse(message).payload;
        if(this.isJson(payloadString)){
            this.payload = JSON.parse(payloadString);
        } else {
            this.payload = payloadString;
        }
    }
     isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}