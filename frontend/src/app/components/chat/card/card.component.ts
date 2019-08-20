import {Component, Input, OnInit} from '@angular/core';
import {ChatSession} from "../../../model/chatsession";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() chat: ChatSession;

  constructor() { }

  ngOnInit() {
  }

}
