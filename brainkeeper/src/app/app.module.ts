import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule} from '@angular/material/dialog';

import { PersistentPersonService } from './services/persistent-person.service';
import { PersonService } from './services/person-service';
import { DatabaseService } from './services/database.service';
import { SessionService } from './services/session-service';

import { AppComponent } from './app.component';
import { GridComponent } from './components/session_screen/grid/grid.component';
import { PersonNameComponent } from './components/session_screen/person-name/person-name.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PersonsComponent } from './components/persons/persons.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { StartComponent } from './components/start/start.component';
import { PersonEditorComponent } from './components/person-editor/person-editor.component';
import { DialogConfirmDeleteComponent } from './components/dialogs/dialog-confirm-delete/dialog-confirm-delete.component';
import { DialogConfirmExitComponent } from './components/dialogs/dialog-confirm-exit/dialog-confirm-exit.component';

// npm install ng2-img-max blueimp-canvas-to-blob --save
import { Ng2ImgMaxModule } from 'ng2-img-max';
// npm install ng2-pica --save
import { Ng2PicaModule } from 'ng2-pica';
// npm install --save-dev @types/node
import * as FS from 'fs';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    PersonNameComponent,
    SettingsComponent,
    StatisticsComponent,
    PersonsComponent,
    NavigationBarComponent,
    StartComponent,
    PersonEditorComponent,
    DialogConfirmDeleteComponent,
    DialogConfirmExitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    Ng2ImgMaxModule,
    Ng2PicaModule,
  ],
  providers: [
    { provide: PersonService, useClass: PersistentPersonService, },
    DatabaseService,
    SessionService,
  ],
  entryComponents: [
    DialogConfirmDeleteComponent,
    DialogConfirmExitComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
