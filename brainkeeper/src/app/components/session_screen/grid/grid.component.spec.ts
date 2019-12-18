import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';

import { StorablePerson } from 'src/app/classes/storable-person';
import { GridComponent } from './grid.component';
import { PersonNameComponent } from './../person-name/person-name.component';
import { SessionService } from 'src/app/services/session-service';
import { isNgTemplate } from '@angular/compiler';


describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let sessionMock: TypeMoq.IMock<SessionService>;
  let sessionStub: SessionService;

  const persons = [
    new StorablePerson(1, 'John Doe', 'a').toPerson(),
    new StorablePerson(2, 'Wolfram Diggibert', 'b').toPerson(),
    new StorablePerson(3, 'Max Mustermann', 'c').toPerson(),
    new StorablePerson(4, 'Herr Mann', 'd').toPerson(),
    new StorablePerson(5, 'Timotäus Tomatimus', 'e').toPerson(),
    new StorablePerson(6, 'Marlene Dietrich', 'f').toPerson(),
];

  beforeEach(async(() => {
    sessionMock = TypeMoq.Mock.ofType<SessionService>(SessionService);
    sessionMock.setup(s => s.names).returns(() => persons.map(p => p.name));
    sessionMock.setup(s => s.pictures).returns(() => persons.map(p => p.picture));
    sessionMock.setup(s => s.startNextRound()).returns(() => new Promise<void>((resolve, reject) => { resolve(); }));
    sessionMock.setup(s => s.checkPerson(TypeMoq.It.isAnyNumber())).returns((n) => n === 2);
    sessionMock.setup(s => s.finishRound());

    sessionStub = sessionMock.object;

    TestBed.configureTestingModule({
      declarations: [ GridComponent, PersonNameComponent ],
      providers: [
        { provide: SessionService, useValue: sessionStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await component.startRound();
    expect(component).toBeTruthy();
  });

  it('should return names', async () => {
    await component.startRound();
    expect(component.names).toEqual(persons.map(p => p.name));
  });

  it('should return pictures', async () => {
    await component.startRound();
    expect(component.pictures).toEqual(persons.map(p => p.picture));
  });

  describe('clicked pictures', () => {
    it('stays in the round if the wrong picture is clicked', () => {
      component.clickedPicture(3);
      sessionMock.verify(s => s.checkPerson(3), TypeMoq.Times.once());
      sessionMock.verify(s => s.finishRound(), TypeMoq.Times.exactly(0));
    });

    it('starts a new round when the correct person is clicked', () => {
      component.clickedPicture(2);
      sessionMock.verify(s => s.checkPerson(2), TypeMoq.Times.once());
      sessionMock.verify(s => s.finishRound(), TypeMoq.Times.once());
    });
  });
});
