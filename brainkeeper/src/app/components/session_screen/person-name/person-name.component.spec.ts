import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';

import { PersonNameComponent } from './person-name.component';
import { SessionService } from 'src/app/services/session-service';

describe('PersonNameComponent', () => {
  let component: PersonNameComponent;
  let fixture: ComponentFixture<PersonNameComponent>;
  let sessionStub: SessionService;
  let sessionMock: TypeMoq.IMock<SessionService>;

  beforeEach(async(() => {
    sessionMock = TypeMoq.Mock.ofType<SessionService>(SessionService);
    sessionMock.setup(s => s.correctPersonName).returns(() => 'Thorsten');
    sessionStub = sessionMock.object;

    TestBed.configureTestingModule({
      declarations: [ PersonNameComponent ],
      providers: [
        { provide: SessionService, useValue: sessionStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct name', () => {
    sessionMock.setup(s => s.round).returns(() => 1);
    expect(component.name).toEqual('Thorsten');
  });

  it('should return "" if no round has been started yet', () => {
    sessionMock.setup(s => s.round).returns(() => 0);
    expect(component.name).toEqual('');
  });
});
