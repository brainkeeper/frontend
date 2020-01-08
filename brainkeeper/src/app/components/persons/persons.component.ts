import {Component, Input, OnInit} from '@angular/core';
import {PersonService} from '../../services/person-service';
import {Person} from '../../classes/person';
import {Router} from '@angular/router';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  allPersons: Promise<Person[]>;

  constructor(public personService: PersonService, private router: Router) {
  }

  ngOnInit() {
    this.allPersons = this.personService.getAll();
  }


  onAddClicked() {
    this.router.navigate([`person/new`]);
  }
}
