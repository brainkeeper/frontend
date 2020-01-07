import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { PersonsComponent } from './persons.component';
import {By} from '@angular/platform-browser';
import {Person} from "../../classes/person";


describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;

  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonsComponent,
        NavigationBarComponent,
      ],
      imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
      ],
      providers: [
        { provide: Location, useValue: locationStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display data inside a list item component', () => {
    fixture.whenStable();
    component.allPersons = new Promise<Person[]>();
    {new Person('Oma', 'src/assets/rentner_test.png'))};
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.card>img').src).toContain('src/assets/rentner_test.png'));
  });

  it('should display nothing if no person is present', () => {
    fixture.whenStable();
    component.allPersons = null;
    fixture.detectChanges();
    const foo = fixture.debugElement;
    expect(foo.query(By.css('.mat-list'))).toBeNull();
  });
});
