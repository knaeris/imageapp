import {Component, Input, OnInit} from '@angular/core';
import {ChatSession} from "../../../../model/chatsession";

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css']
})
export class CardHeaderComponent implements OnInit {

  @Input() chat: ChatSession;

  constructor() { }

  ngOnInit() {
  }

}
