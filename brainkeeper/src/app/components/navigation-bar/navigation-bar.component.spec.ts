import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponent } from './navigation-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
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
});
