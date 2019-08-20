import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatService} from "../../../../services/chat.service";
import {ChatSession} from "../../../../model/chatsession";

@Component({
    selector: 'app-people-card-header',
    templateUrl: './people-card-header.component.html',
    styleUrls: ['./people-card-header.component.css']
})
export class PeopleCardHeaderComponent implements OnInit {

    personName: string;
    chatName: string;
    @Output() chatOutput = new EventEmitter<ChatSession>();

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
    }

    joinChat() {
        this.chatService.join(this.chatName, true, this.personName)
            .then(chat => this.chatOutput.emit(chat))
    }
}
