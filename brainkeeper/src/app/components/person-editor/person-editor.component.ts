import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person-service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Person } from 'src/app/classes/person';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from '../dialogs/dialog-confirm-delete/dialog-confirm-delete.component';
import { DialogConfirmExitComponent } from '../dialogs/dialog-confirm-exit/dialog-confirm-exit.component';
import { ImageServiceService } from 'src/app/services/image-service.service';

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.scss']
})
export class PersonEditorComponent implements OnInit {

  public isNew: boolean;

  private person: Person;

  private personForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    picture: new FormControl('', [Validators.required]),
  });

  constructor(
    private personService: PersonService,
    private imageService: ImageServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      if (params.has('id')) {
        this.isNew = false;
        await this.getExistingPerson(Number.parseInt(params.get('id'), 10));
      } else {
        this.isNew = true;
      }
    });
  }

  private changed(): boolean {
    if (this.isNew) {
      return true;
    } else {
      return this.person.name !== this.name.value
        || this.person.picture !== this.picture.value;
    }
  }

  private get name(): AbstractControl {
    return this.personForm.get('name');
  }

  private get picture(): AbstractControl {
    return this.personForm.get('picture');
  }

  private async onSave() {
    if (this.isNew) {
      this.saveNewPerson();
    } else {
      this.saveExistingPerson();
    }
  }

  private onDelete() {
    this.dialog.open(DialogConfirmDeleteComponent).afterClosed().subscribe(result => {
      if (result) {
        this.personService.remove(this.person.id);
        this.router.navigate(['persons']);
      }
    });
  }

  private onBackClicked(goBack: () => void) {
    if (this.changed()) {
      this.dialog.open(DialogConfirmExitComponent).afterClosed().subscribe(result => {
        if (result) {
          goBack();
        }
      });
    } else {
      goBack();
    }
  }

  private async onFileInput($event) {
    this.picture.setValue(await this.imageService.getBase64($event.target.files[0], true));
  }

  private updateFormControl() {
    this.personForm.setValue({
      name: this.person.name,
      picture: this.person.picture
    });
  }

  private updatePerson() {
    this.person.name = this.name.value;
    this.person.picture = this.picture.value;
  }

  private async getExistingPerson(id: number) {
    try {
      this.person = await this.personService.getById(id);
      this.updateFormControl();
    } catch (error) {
      this.router.navigate(['person/new']);
    }
  }

  private async saveNewPerson() {
    let newPerson = new Person(this.name.value, this.picture.value);
    newPerson = await this.personService.add(newPerson);
    this.snackBar.open('New person saved', undefined, { duration: 3000 });
    this.router.navigate([`person/${newPerson.id}`]);
  }

  private async saveExistingPerson() {
    const unchangedPerson = this.person.copy();
    this.updatePerson();
    if (await this.personService.update(this.person)) {
     this.snackBar
      .open('Saved changes', 'Undo', { duration: 3000 })
      .onAction().subscribe(async () => {
        this.person = unchangedPerson;
        this.updateFormControl();
        await this.personService.update(this.person);
      });
    } else {
      this.snackBar.open('Changes could not be saved', undefined, { duration: 3000 });
    }
  }
}
