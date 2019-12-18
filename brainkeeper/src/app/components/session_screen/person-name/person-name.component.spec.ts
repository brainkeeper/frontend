import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as TypeMoq from 'typemoq';

import { PersonNameComponent } from './person-name.component';
import { SessionService } from 'src/app/services/session-service';

describe('PersonNameComponent', () => {
  let component: PersonNameComponent;
  let fixture: ComponentFixture<PersonNameComponent>;
  let sessionStub: SessionService;

  beforeEach(async(() => {
    const sessionMock = TypeMoq.Mock.ofType<SessionService>(SessionService);
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
    expect(component.name).toEqual('Thorsten');
  });
});
