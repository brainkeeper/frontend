import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { StartComponent } from './start.component';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;
  let debugElement: DebugElement;

  const locationStub = {
    back: jasmine.createSpy('back')
  };

  let routerStub;

  beforeEach(async(() => {
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [
        StartComponent,
        NavigationBarComponent,
      ],
      imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
      ],
      providers: [
        { provide: Location, useValue: locationStub },
        { provide: Router, useValue: routerStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('click on game button navigates to /game', () => {
    debugElement.query(By.css('#btn-play')).nativeElement.click();
    const have = (routerStub.navigate as jasmine.Spy).calls.first().args[0];
    expect(have).toEqual(['game']);
  });

  it('click on statistics button navigates to /game', () => {
    debugElement.query(By.css('#btn-statistics')).nativeElement.click();
    const have = (routerStub.navigate as jasmine.Spy).calls.first().args[0];
    expect(have).toEqual(['statistics']);
  });

  it('click on persons button navigates to /persons', () => {
    debugElement.query(By.css('#btn-persons')).nativeElement.click();
    const have = (routerStub.navigate as jasmine.Spy).calls.first().args[0];
    expect(have).toEqual(['persons']);
  });

  it('click on settings button navigates to /settings', () => {
    debugElement.query(By.css('#btn-settings')).nativeElement.click();
    const have = (routerStub.navigate as jasmine.Spy).calls.first().args[0];
    expect(have).toEqual(['settings']);
  });
});
