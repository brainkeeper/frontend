import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { Person } from 'src/app/classes/person';
import { PersonService } from 'src/app/services/person-service';
import { DialogConfirmDeleteComponent } from '../dialogs/dialog-confirm-delete/dialog-confirm-delete.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { PersonEditorComponent } from './person-editor.component';
import { DialogConfirmExitComponent } from '../dialogs/dialog-confirm-exit/dialog-confirm-exit.component';
import { ImageService } from 'src/app/services/image.service';


describe('PersonEditorComponent', () => {
  let component: PersonEditorComponent;
  let fixture: ComponentFixture<PersonEditorComponent>;
  let snackBar;
  let dialog;

  let locationStub;
  let personServiceStub;
  let imageServiceStub;
  let routerStub;
  let route$;

  let btnSave: DebugElement;
  let btnDelete: DebugElement;
  let inputName: DebugElement;
  let inputPicture: DebugElement;
  let picture: DebugElement;
  let errorNameRequired: DebugElement;
  let errorPictureRequired: DebugElement;

  beforeEach(async(() => {
    locationStub = jasmine.createSpyObj('Location', ['back']);
    personServiceStub = jasmine.createSpyObj('PersonService', ['getById', 'remove', 'add', 'update']);
    imageServiceStub = jasmine.createSpyObj('ImageServiceService', ['getBase64']);
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    route$ = new BehaviorSubject(undefined);

    TestBed.configureTestingModule({
      declarations: [
        PersonEditorComponent,
        NavigationBarComponent,
      ],
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: PersonService, useValue: personServiceStub },
        { provide: ImageService, useValue: imageServiceStub },
        { provide: ActivatedRoute, useValue: { paramMap: route$.asObservable() } },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditorComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.get(MatSnackBar);
    dialog = TestBed.get(MatDialog);
  });

  function reloadDebugElements() {
    btnSave = fixture.debugElement.query(By.css('#btn-save'));
    btnDelete = fixture.debugElement.query(By.css('#btn-delete'));
    inputName = fixture.debugElement.query(By.css('#input-name'));
    inputPicture = fixture.debugElement.query(By.css('#input-picture'));
    picture = fixture.debugElement.query(By.css('#picture'));
    errorNameRequired = fixture.debugElement.query(By.css('#error-name-required'));
    errorPictureRequired = fixture.debugElement.query(By.css('#error-pic-required'));
  }

  function simulateFileInput(file, base64Image): jasmine.Spy<InferableFunction> {
    const filesSpy = spyOnProperty(inputPicture.nativeElement, 'files').and.returnValue([file]);
    imageServiceStub.getBase64.and.returnValue(Promise.resolve(base64Image));
    inputPicture.nativeElement.dispatchEvent(new Event('change'));
    return filesSpy;
  }

  function inputNewName() {
    inputName.nativeElement.value = 'New Name';
    inputName.nativeElement.dispatchEvent(new Event('input'));
  }

  describe('new person', () => {

    beforeEach(() => {
      route$.next(convertToParamMap({}));
      fixture.detectChanges();
      reloadDebugElements();
    });

    it('sets isNew to true', () => {
      expect(component.isNew).toBe(true);
    });

    it(`sets title to 'New person'`, () => {
      const have = fixture.debugElement.query(By.css('#card mat-card-header mat-card-title')).nativeElement.textContent;
      expect(have).toEqual('New person');
    });

    it('removes subtitle', () => {
      const have = fixture.debugElement.query(By.css('#card mat-card-header mat-card-subtitle'));
      expect(have).toBeNull();
    });

    it('shows placeholder picture', () => {
      const img = picture.nativeElement;
      expect(img.src.endsWith('/assets/person-24px.svg')).toBeTruthy();
      expect(img.classList).toContain('required');
      expect(img.classList).toContain('placeholder');
    });

    it('shows no delete button', () => {
      expect(btnDelete).toBeNull();
    });

    it('disables save button when no picture and name is set', () => {
      expect(btnSave.nativeElement.disabled).toBeTruthy();
    });

    it('removes required error when name is entered', () => {
      inputName.nativeElement.value = 'Jon Doe';
      inputName.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(btnSave.nativeElement.disabled).toBeTruthy();
      expect(errorNameRequired).toBeNull();
    });

    it('removes required error when picture is added', fakeAsync(() => {
      expect(errorPictureRequired).not.toBeNull();
      const newImage = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3';
      const file = new File([], 'test');
      const filesSpy = simulateFileInput(file, newImage);
      tick();
      fixture.detectChanges();
      expect(filesSpy).toHaveBeenCalled();
      expect(imageServiceStub.getBase64).toHaveBeenCalledWith(file, 0, 0, 0.8);
      expect(picture.nativeElement.src).toEqual(newImage);
      reloadDebugElements();
      expect(btnSave.nativeElement.disabled).toBeTruthy();
      expect(errorPictureRequired).toBeNull();
      flush();
    }));

    it('saves new person and navigates to editor', fakeAsync(() => {
      inputName.nativeElement.value = 'Jon Doe';
      inputName.nativeElement.dispatchEvent(new Event('input'));
      const newImage = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3';
      const file = new File([], 'test');
      simulateFileInput(file, newImage);
      tick();
      fixture.detectChanges();
      expect(btnSave.nativeElement.disabled).toBeFalsy();
      personServiceStub.add.and.callFake((person: Person) => {
        expect(person.name).toEqual('Jon Doe');
        expect(person.id).toBeNull();
        expect(person.picture).toEqual(newImage);
        expect(person.score).toEqual(0);
        person.id = 12;
        return Promise.resolve(person);
      });
      btnSave.nativeElement.click();
      tick();
      expect(personServiceStub.add).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['person/12']);
      flush();
    }));

    it('navigates back when nothing entered', () => {
      const navBar: NavigationBarComponent = fixture.debugElement.query(By.css('app-navigation-bar')).context;
      navBar.backClicked.next();
      expect(routerStub.navigate).toHaveBeenCalledWith(['persons']);
    });

    it('navigates back when name entered and confirmed', () => {
      const dialogSpy = spyOn(dialog, 'open');

      dialogSpy.and.returnValue({ afterClosed: () => of(true) });
      inputNewName();
      fixture.detectChanges();

      const navBar: NavigationBarComponent = fixture.debugElement.query(By.css('app-navigation-bar')).context;
      navBar.backClicked.next();

      expect(dialogSpy).toHaveBeenCalledWith(DialogConfirmExitComponent);
      expect(routerStub.navigate).toHaveBeenCalledWith(['persons']);
    });

    it('navigates back when picture entered and confirmed', fakeAsync(() => {
      const dialogSpy = spyOn(dialog, 'open');

      dialogSpy.and.returnValue({ afterClosed: () => of(true) });
      simulateFileInput(new File([], 'test'), 'abc');
      tick();
      fixture.detectChanges();

      const navBar: NavigationBarComponent = fixture.debugElement.query(By.css('app-navigation-bar')).context;
      navBar.backClicked.next();

      expect(dialogSpy).toHaveBeenCalledWith(DialogConfirmExitComponent);
      expect(routerStub.navigate).toHaveBeenCalledWith(['persons']);
    }));

    it('navigates not back when name changed and not confirmed', () => {
      const dialogSpy = spyOn(dialog, 'open');

      dialogSpy.and.returnValue({ afterClosed: () => of(false) });
      inputNewName();
      fixture.detectChanges();

      const navBar: NavigationBarComponent = fixture.debugElement.query(By.css('app-navigation-bar')).context;
      navBar.backClicked.next();

      expect(dialogSpy).toHaveBeenCalledWith(DialogConfirmExitComponent);
      expect(routerStub.navigate).not.toHaveBeenCalled();
    });

    it('navigates not back when picture entered and not confirmed', fakeAsync(() => {
      const dialogSpy = spyOn(dialog, 'open');

      dialogSpy.and.returnValue({ afterClosed: () => of(false) });
      simulateFileInput(new File([], 'test'), 'abc');
      tick();
      fixture.detectChanges();

      const navBar: NavigationBarComponent = fixture.debugElement.query(By.css('app-navigation-bar')).context;
      navBar.backClicked.next();

      expect(dialogSpy).toHaveBeenCalledWith(DialogConfirmExitComponent);
      expect(routerStub.navigate).not.toHaveBeenCalledWith(['persons']);
    }));
  });

  it('navigates to person/new when no person with provided id was found', fakeAsync(() => {
    route$.next(convertToParamMap({ id: 42 }));
    personServiceStub.getById.and.returnValue(Promise.reject());
    fixture.detectChanges();
    tick();
    expect(routerStub.navigate).toHaveBeenCalledWith(['person/new']);
  }));

  describe('existing person', () => {

    beforeEach(fakeAsync(() => {
      route$.next(convertToParamMap({ id: 42 }));
      personServiceStub.getById.and.returnValue(Promise.resolve(new Person('Jon Doe', 'data:image/jpg;base64,abc', 42, 5)));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      reloadDebugElements();
    }));

    it('sets isNew to false', () => {
      expect(component.isNew).toBe(false);
    });

    it(`sets title to 'Jon Doe'`, () => {
      const have = fixture.debugElement.query(By.css('#card mat-card-header mat-card-title')).nativeElement.textContent;
      expect(have).toEqual('Jon Doe');
    });

    it('shows id in subtitle', () => {
      const have = fixture.debugElement.query(By.css('#card mat-card-header mat-card-subtitle')).nativeElement.textContent;
      expect(have).toEqual('Id: 42');
    });

    it('shows picture', () => {
      const img = fixture.debugElement.query(By.css('#picture')).nativeElement;
      expect(img.src).toEqual('data:image/jpg;base64,abc');
    });

    it('sets name in input field', () => {
      expect(inputName.nativeElement.value).toEqual('Jon Doe');
    });

    it('shows delete button', () => {
      expect(btnDelete).not.toBeNull();
    });

    it('disables save button when no changes are made', () => {
      expect(btnSave.nativeElement.disabled).toBeTruthy();
    });

    it('disables save button when same name is entered', () => {
      inputName.nativeElement.value = 'Jon Doe';
      inputName.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(btnSave.nativeElement.disabled).toBeTruthy();
    });

    it('removes required error when new name is entered', () => {
      inputName.nativeElement.value = 'Jon Doe';
      inputName.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(btnSave.nativeElement.disabled).toBeTruthy();
      expect(errorNameRequired).toBeNull();
    });

    it('removes required error when picture is changed', fakeAsync(() => {
      expect(errorPictureRequired).toBeNull();
      const newImage = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3';
      const file = new File([], 'test');
      const filesSpy = simulateFileInput(file, newImage);
      tick();
      fixture.detectChanges();
      expect(picture.nativeElement.src).toEqual(newImage);
      expect(filesSpy).toHaveBeenCalled();
      expect(imageServiceStub.getBase64).toHaveBeenCalledWith(file, 0, 0, 0.8);
      reloadDebugElements();
      expect(btnSave.nativeElement.disabled).toBeFalsy();
      expect(errorPictureRequired).toBeNull();
    }));

    it('saves new name', fakeAsync(() => {
      personServiceStub.update.and.callFake((person: Person) => {
        expect(person.name).toEqual('New Name');
        return Promise.resolve(true);
      });
      inputNewName();
      fixture.detectChanges();
      btnSave.nativeElement.click();
      fixture.detectChanges();
      tick();
      expect(personServiceStub.update).toHaveBeenCalled();
      flush();
    }));

    it('saves new picture', fakeAsync(() => {
      const newImage = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3';
      personServiceStub.update.and.callFake((person: Person) => {
        expect(person.picture).toEqual(newImage);
        return Promise.resolve(true);
      });
      simulateFileInput(new File([], 'test'), newImage);
      tick();
      fixture.detectChanges();
      btnSave.nativeElement.click();
      fixture.detectChanges();
      tick();
      expect(personServiceStub.update).toHaveBeenCalled();
      flush();
    }));

    it(`reverts changed name when 'undo' in snackbar is clicked`, fakeAsync(() => {
      const snackBarSpy = spyOn(snackBar, 'open');
      snackBarSpy.and.returnValue({ onAction: () => of(undefined) });
      personServiceStub.update.and.returnValue(Promise.resolve(true));
      inputNewName();
      fixture.detectChanges();
      btnSave.nativeElement.click();
      fixture.detectChanges();
      tick();
      expect(personServiceStub.update).toHaveBeenCalledTimes(2);
      const firstPersonUpdate: Person = personServiceStub.update.calls.argsFor(0)[0];
      const secondPersonUpdate: Person = personServiceStub.update.calls.argsFor(1)[0];
      expect(firstPersonUpdate.name).toEqual('New Name');
      expect(secondPersonUpdate.name).toEqual('Jon Doe');
      flush();
    }));

    it('shows error when person could not be updated', fakeAsync(() => {
      const snackBarSpy = spyOn(snackBar, 'open');
      snackBarSpy.and.callThrough();
      personServiceStub.update.and.returnValue(Promise.resolve(false));
      inputNewName();
      fixture.detectChanges();
      btnSave.nativeElement.click();
      fixture.detectChanges();
      tick();
      expect(snackBarSpy.calls.first().args[0]).toEqual('Changes could not be saved');
      expect(snackBarSpy.calls.first().args[1]).toBeUndefined();
      expect(personServiceStub.update).toHaveBeenCalled();
      flush();
    }));

    it('deletes person when deletion is confirmed and navigates to /persons', fakeAsync(() => {
      const dialogSpy = spyOn(dialog, 'open');
      dialogSpy.and.returnValue({ afterClosed: () => of(true) });
      btnDelete.nativeElement.click();
      fixture.detectChanges();
      expect(dialogSpy).toHaveBeenCalledWith(DialogConfirmDeleteComponent);
      expect(personServiceStub.remove).toHaveBeenCalledWith(42);
      expect(routerStub.navigate).toHaveBeenCalledWith(['persons']);
    }));

    it('keeps person when deletion is declined', fakeAsync(() => {
      const dialogSpy = spyOn(dialog, 'open');
      dialogSpy.and.returnValue({ afterClosed: () => of(false) });
      btnDelete.nativeElement.click();
      fixture.detectChanges();
      expect(dialogSpy).toHaveBeenCalledWith(DialogConfirmDeleteComponent);
      expect(personServiceStub.remove).not.toHaveBeenCalled();
    }));

    it('navigates back when no changes', () => {
      const navBar: NavigationBarComponent = fixture.debugElement.query(By.css('app-navigation-bar')).context;
      navBar.backClicked.next();
      expect(routerStub.navigate).toHaveBeenCalledWith(['persons']);
    });

    it('navigates back when name changed and confirmed', () => {
      const dialogSpy = spyOn(dialog, 'open');

      dialogSpy.and.returnValue({ afterClosed: () => of(true) });
      inputNewName();
      fixture.detectChanges();

      const navBar: NavigationBarComponent = fixture.debugElement.query(By.css('app-navigation-bar')).context;
      navBar.backClicked.next();

      expect(dialogSpy).toHaveBeenCalledWith(DialogConfirmExitComponent);
      expect(routerStub.navigate).toHaveBeenCalledWith(['persons']);
    });

    it('navigates not back when name changed and not confirmed', () => {
      const dialogSpy = spyOn(dialog, 'open');

      dialogSpy.and.returnValue({ afterClosed: () => of(false) });
      inputNewName();
      fixture.detectChanges();

      const navBar: NavigationBarComponent = fixture.debugElement.query(By.css('app-navigation-bar')).context;
      navBar.backClicked.next();

      expect(dialogSpy).toHaveBeenCalledWith(DialogConfirmExitComponent);
      expect(routerStub.navigate).not.toHaveBeenCalled();
    });
  });
});
