import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';

import { StorablePerson } from 'src/app/classes/storable-person';
import { GridComponent } from './grid.component';
import { PersonNameComponent } from './../person-name/person-name.component';
import { SessionService } from 'src/app/services/session-service';
import { isNgTemplate } from '@angular/compiler';
import { SmallPersonCardComponent } from 'src/app/components/session_screen/small-person-card/small-person-card.component';
import { BigPersonCardComponent } from 'src/app/components/session_screen/big-person-card/big-person-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Person } from 'src/app/classes/person';


describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let sessionMock: TypeMoq.IMock<SessionService>;
  let sessionStub: SessionService;
  let round: number;


  const persons = [
    new StorablePerson(1, 'John Doe', 'a').toPerson(),
    new StorablePerson(2, 'Wolfram Diggibert', 'b').toPerson(),
    new StorablePerson(3, 'Max Mustermann', 'c').toPerson(),
    new StorablePerson(4, 'Herr Mann', 'd').toPerson(),
    new StorablePerson(5, 'Timotäus Tomatimus', 'e').toPerson(),
    new StorablePerson(6, 'Marlene Dietrich', 'f').toPerson(),
];

  beforeEach(async(() => {
    round = 0;
    sessionMock = TypeMoq.Mock.ofType<SessionService>(SessionService, undefined, false);
    sessionMock.setup(s => s.persons).returns(() => persons);
    sessionMock.setup(s => s.startNextRound())
      .callback(() => round++)
      .returns(() => new Promise<void>((resolve, reject) => { resolve(); }));
    sessionMock.setup(s => s.checkPerson(TypeMoq.It.isAnyNumber())).returns((n) => n === 2);
    sessionMock.setup(s => s.round).returns(() => round);
    sessionMock.setup(s => s.finishRound());

    sessionStub = sessionMock.object;

    TestBed.configureTestingModule({
      declarations: [
        GridComponent,
        PersonNameComponent,
        SmallPersonCardComponent,
        BigPersonCardComponent,
      ],
      providers: [
        { provide: SessionService, useValue: sessionStub }
      ],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
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

  it('should return persons', async () => {
    await component.startRound();
    expect(component.persons).toEqual(persons);
  });

  describe('clicked pictures', () => {
    it('stays in the round if the wrong picture is clicked', async () => {
      await component.clickedPicture(3);
      sessionMock.verify(s => s.checkPerson(3), TypeMoq.Times.once());
      sessionMock.verify(s => s.finishRound(), TypeMoq.Times.exactly(0));
      expect(sessionStub.round).toEqual(1);
    });

    it('starts a new round when the correct person is clicked', async () => {
      await component.clickedPicture(2);
      sessionMock.verify(s => s.checkPerson(2), TypeMoq.Times.once());
      sessionMock.verify(s => s.finishRound(), TypeMoq.Times.once());
      expect(sessionStub.round).toEqual(2);
    });
  });
});
