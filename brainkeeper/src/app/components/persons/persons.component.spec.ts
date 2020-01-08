import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { PersonService } from 'src/app/services/person-service';
import { Person } from '../../classes/person';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { PersonsComponent } from './persons.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { PersonListItemComponent } from '../person-list-item/person-list-item.component';
import { Router } from '@angular/router';


describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;

  const routerStub = jasmine.createSpyObj('Router', ['navigate']);

  let personServiceStub;
  const persons = [
    new Person('Jon Doe', 'data:image/jpg;base64,abc', 1, 0),
    new Person('Jane Doe', 'data:image/jpg;base64,abc', 2, 5),
  ];

  beforeEach(async(() => {
    personServiceStub = jasmine.createSpyObj('PersonService', ['getAll']);
    TestBed.configureTestingModule({
      declarations: [
        PersonsComponent,
        NavigationBarComponent,
        PersonListItemComponent,
      ],
      imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
      ],
      providers: [
        { provide: PersonService, useValue: personServiceStub },
        { provide: Router, useValue: routerStub},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsComponent);
    component = fixture.componentInstance;
  });

  it('displays data inside a list item component', async () => {
    personServiceStub.getAll.and.returnValue(new Promise<Person[]>((resolve, reject) => { resolve(persons); }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(By.css('app-person-list-item'));
    expect(listItems.filter(i => i.componentInstance.person === persons[0]).length).toBe(1);
    expect(listItems.filter(i => i.componentInstance.person === persons[1]).length).toBe(1);
    expect(listItems.every(i => i.componentInstance.showScore === false)).toBeTruthy();
  });

  it('displays nothing if no person is present', async () => {
    personServiceStub.getAll.and.returnValue(new Promise<Person[]>((resolve, reject) => { resolve([]); }));
    fixture.detectChanges();
    await fixture.whenStable();
    const listItems = fixture.debugElement.queryAll(By.css('app-person-list-item'));
    expect(listItems.length).toBe(0);
  });

  it('navigates to person/new when add is clicked', () => {
    fixture.debugElement.query(By.css('#btn-add')).nativeElement.click();
    expect(routerStub.navigate).toHaveBeenCalledWith(['person/new']);
  });
});
