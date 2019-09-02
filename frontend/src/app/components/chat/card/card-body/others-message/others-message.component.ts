import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../../../model/message";

@Component({
  selector: 'app-others-message',
  templateUrl: './others-message.component.html',
  styleUrls: ['./others-message.component.css']
})
export class OthersMessageComponent implements OnInit {

  @Input() message: Message;

  constructor() { }

  ngOnInit() {
  }

}
