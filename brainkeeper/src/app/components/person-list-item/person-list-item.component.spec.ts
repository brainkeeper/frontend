import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonListItemComponent } from './person-list-item.component';
import {Person} from '../../classes/person';
import {Router} from '@angular/router';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('PersonListItemComponent', () => {
  let component: PersonListItemComponent;
  let fixture: ComponentFixture<PersonListItemComponent>;
  let routerStub;
  let editButton;

  beforeEach(async(() => {
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ PersonListItemComponent ],
      providers: [
        { provide: Router, useValue: routerStub },
      ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
      ],
    }
  )
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListItemComponent);
    component = fixture.componentInstance;
    component.person = new Person('Jon Doe', 'data:image/jpg;base64,abc', 123, 100);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays name and picture of a person', () => {
    expect(fixture.debugElement.query(By.css('.person_name')).nativeElement.textContent).toEqual('Jon Doe');
    expect(fixture.debugElement.query(By.css('.picture')).nativeElement.src).toEqual('data:image/jpg;base64,abc');
    expect(fixture.debugElement.query(By.css('.person_score'))).toBeNull();
  });

  it('navigates to edit page', () => {
    editButton = fixture.debugElement.query(By.css('#edit_button'));
    editButton.nativeElement.click();
    expect(routerStub.navigate).toHaveBeenCalledWith(['person/123']);
  });

  it('shows score', () => {
    component.showScore = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.person_score')).nativeElement.textContent).toEqual('100');
  });
});
