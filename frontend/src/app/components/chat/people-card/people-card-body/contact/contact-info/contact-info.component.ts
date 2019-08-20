import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../../../../../../model/person";

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  @Input() contact: Person;

  constructor() { }

  ngOnInit() {
  }

}
