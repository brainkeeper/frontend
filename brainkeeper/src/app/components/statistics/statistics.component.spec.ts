import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { StatisticsComponent } from './statistics.component';
import { MatCardModule } from '@angular/material/card';
import { Person } from 'src/app/classes/person';
import { PersonService } from 'src/app/services/person-service';
import { Router } from '@angular/router';
import { PersonListItemComponent } from '../person-list-item/person-list-item.component';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  const routerStub = jasmine.createSpyObj('Router', ['navigate']);

  let personServiceStub;
  const persons = [
    new Person('Jane Doe', 'data:image/jpg;base64,abc', 2, 5),
    new Person('Jon Doe', 'data:image/jpg;base64,abc', 1, 1),
  ];

  beforeEach(() => {
    personServiceStub = jasmine.createSpyObj('PersonService', ['getAllWithScore']);
    TestBed.configureTestingModule({
      declarations: [
        StatisticsComponent,
        NavigationBarComponent,
        PersonListItemComponent,
      ],
      imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
      ],
      providers: [
        { provide: PersonService, useValue: personServiceStub },
        { provide: Router, useValue: routerStub },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
  });

  it('displays data inside a list item component', async () => {
    personServiceStub.getAllWithScore.and.returnValue(new Promise<Person[]>((resolve, reject) => { resolve(persons); }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(By.css('app-person-list-item'));
    expect(listItems.filter(i => i.componentInstance.person === persons[0]).length).toBe(1);
    expect(listItems.filter(i => i.componentInstance.person === persons[1]).length).toBe(1);
    expect(listItems.every(i => i.componentInstance.showScore === true)).toBeTruthy();
  });

  it('displays nothing if no person is present', async () => {
    personServiceStub.getAllWithScore.and.returnValue(new Promise<Person[]>((resolve, reject) => { resolve([]); }));
    fixture.detectChanges();
    await fixture.whenStable();
    const listItems = fixture.debugElement.queryAll(By.css('app-person-list-item'));
    expect(listItems.length).toBe(0);
  });
});
