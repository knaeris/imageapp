import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {ChatSession} from "../model/chatsession";
import {Message} from "../model/message";

@Injectable({
    providedIn: 'root'
})
export class ChatService extends BaseService{

    public join(chatName: string, isPublic: boolean, personName: string): Promise<ChatSession>{
        return this.post("chat/" + chatName + "/join", personName);
    }

    public send(chatName: string, message: Message): Promise<ChatSession>{
        return this.post("chat/" + chatName + "/message", message);
    }
}