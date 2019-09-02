import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../../../model/person";

@Component({
  selector: 'app-user-img',
  templateUrl: './user-img.component.html',
  styleUrls: ['./user-img.component.css']
})
export class UserImgComponent implements OnInit {

  @Input() contact: Person;

  constructor() { }

  ngOnInit() {
  }

}
