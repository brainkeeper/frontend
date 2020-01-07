import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../../classes/person';

@Component({
  selector: 'app-big-person-card',
  templateUrl: './big-person-card.component.html',
  styleUrls: ['./big-person-card.component.scss']
})
export class BigPersonCardComponent implements OnInit {

  show: boolean;
  clicked: boolean;
  @Input() chosenPerson: Person;
  @Input() isRight: boolean;
  constructor() {
    this.show = true;
  }

  ngOnInit() {
  }

  close() {
     this.show = false;
     this.clicked = true;
  }

  open() {
    if (this.clicked) {
      this.show = true;
      this.clicked = false;
    }
  }
}
