import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/classes/person';

@Component({
  selector: 'app-small-person-card',
  templateUrl: './small-person-card.component.html',
  styleUrls: ['./small-person-card.component.scss']
})
export class SmallPersonCardComponent implements OnInit {

  person: Person;
  selectedPerson: Person;

  constructor() {
    this.person = new Person('Oma', 'assets/rentner_test.jpg', 1);
  }

  ngOnInit() {
  }

  onSelect(): void{
    this.selectedPerson = this.person;
  }


}
