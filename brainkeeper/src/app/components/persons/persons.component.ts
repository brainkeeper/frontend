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

  @Input()
  allPersons: Promise<Person[]>;

  constructor(public personService: PersonService, private router: Router) {
    this.allPersons = personService.getAll();
  }

  ngOnInit() {
  }


  onAddClicked() {
    this.router.navigate([`person/new`]);
  }
}
