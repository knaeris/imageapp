import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {ChatSession} from "../model/chatsession";
import {Message} from "../model/message";
import {Person} from "../model/person";
import {Observable} from "rxjs";
import {WebsocketService} from "./websocket.service";

@Injectable({
    providedIn: 'root'
})
export class ChatService extends BaseService{

    public join(chatName: string, personName: string): Observable<ChatSession>{
        return super.post("chat/" + chatName, personName);
    }

    public changeName(chatName: string, newName: string, id: number){
        return super.put("chat/" + chatName + "/changename/" + id, newName)
    }

}