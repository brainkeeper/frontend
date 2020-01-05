import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponent } from './navigation-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  let locationStub;

  beforeEach(async(() => {
    locationStub = {
      back: jasmine.createSpy('back')
    };
    TestBed.configureTestingModule({
      declarations: [
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
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('displays back button when showBackButton is true ', () => {
    component.showBackButton = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button'))).toBeDefined();
  });

  it('removes back button when showBackButton is false ', () => {
    component.showBackButton = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button'))).toBeNull();
  });

  it('click on back button navigates back', () => {
    component.showBackButton = true;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(locationStub.back).toHaveBeenCalled();
  });

  it('click on back button emits event', (done) => {
    component.showBackButton = true;
    fixture.detectChanges();
    component.backClicked.subscribe(goBack => {
        expect(locationStub.back).not.toHaveBeenCalled();
        done();
    });
    fixture.debugElement.query(By.css('button')).nativeElement.click();
  });

  it('subscriber to backClicked can navigate back', (done) => {
    component.showBackButton = true;
    fixture.detectChanges();
    component.backClicked.subscribe(goBack => {
        expect(locationStub.back).not.toHaveBeenCalled();
        goBack();
        expect(locationStub.back).toHaveBeenCalledTimes(1);
        done();
    });
    fixture.debugElement.query(By.css('button')).nativeElement.click();
  });

  it('default title is BRAINKEEPER', () => {
    const title = fixture.debugElement.query(By.css('span')).nativeElement.textContent;
    expect(title).toEqual('BRAINKEEPER');
  });

  it(`sets title to "Custom Title"`, () => {
    component.title = 'Custom Title';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('span')).nativeElement.textContent;
    expect(title).toEqual('Custom Title');
  });

  it('renders content inside navigation bar', () => {
    TestBed.resetTestingModule();
    @Component({
      selector: 'app-host',
      template: `
        <app-navigation-bar>
          <button id="btn-test" (click)="onClick()"></button>
        </app-navigation-bar>
      `,
    })
    class TestHostComponent {
      onClick() {}
    }

    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
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
    }).compileComponents();
    const host = TestBed.createComponent(TestHostComponent);
    const clickSpy = spyOn(host.componentInstance, 'onClick');
    host.debugElement.query(By.css('#btn-test')).nativeElement.click();
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
