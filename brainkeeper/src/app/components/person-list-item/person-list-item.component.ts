import {Component, Input, OnInit} from '@angular/core';
import { Person } from 'src/app/classes/person';

@Component({
  selector: 'app-person-list-item',
  templateUrl: './person-list-item.component.html',
  styleUrls: ['./person-list-item.component.scss']
})
export class PersonListItemComponent implements OnInit {

  @Input()
  public person: Person;

  constructor() {
    // this.person = new Person('Omaaaaa', 'assets/testpic.png', 1);
  }

  ngOnInit() {
  }

}
