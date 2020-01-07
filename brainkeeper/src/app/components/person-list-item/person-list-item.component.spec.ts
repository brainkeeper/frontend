import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonListItemComponent } from './person-list-item.component';
import {Person} from '../../classes/person';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';

describe('PersonListItemComponent', () => {
  let component: PersonListItemComponent;
  let fixture: ComponentFixture<PersonListItemComponent>;
  let routerStub;
  let editButton;

  beforeEach(async(() => {
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ PersonListItemComponent ],
      providers: [{ provide: Router, useValue: routerStub }]
    }
  )
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListItemComponent);
    component = fixture.componentInstance;
    component.person = new Person('Oma', 'src/assets/rentner_test.png', 123, 100);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct data about a person', () => {
    fixture.whenStable();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.container>img.picture').src).toContain('src/assets/rentner_test.png');
    expect(compiled.querySelector('div.container>div.person_name')).toContain('Oma');
  });

  it('should navigate to edit page', () => {
    editButton = fixture.debugElement.query(By.css('#edit_button'));
    editButton.nativeElement.click();
    expect(routerStub.navigate).toHaveBeenCalledWith(['person/123']);
  });
});
