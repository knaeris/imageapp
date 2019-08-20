import {Component, Input, OnInit} from '@angular/core';
import {ChatSession} from "../../../../model/chatsession";
import {ChatService} from "../../../../services/chat.service";
import {Message} from "../../../../model/message";

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.css']
})
export class CardFooterComponent implements OnInit {

  @Input() chat: ChatSession;
  content:string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  send(){
    this.chatService.send(this.chat.name, new Message(this.content, this.chat.participants[0]))
        .then(result => this.chat = result);
  }
}
