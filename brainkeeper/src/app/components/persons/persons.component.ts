import {Component, Input, OnInit} from '@angular/core';
import {PersonService} from '../../services/person-service';
import {Person} from '../../classes/person';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  @Input()
  allPersons: Promise<Person[]>;

  constructor(public personService: PersonService) {
    this.allPersons = personService.getAll();
  }

  ngOnInit() {
  }

}
