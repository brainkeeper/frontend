import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../classes/person';

@Component({
  selector: 'app-big-person-card',
  templateUrl: './big-person-card.component.html',
  styleUrls: ['./big-person-card.component.scss']
})
export class BigPersonCardComponent implements OnInit {

  show: boolean;

  @Input() chosenPerson: Person;
  constructor() {
    this.show = true;
  }

  ngOnInit() {
  }


  close() {
      this.show = false;
  }

}
