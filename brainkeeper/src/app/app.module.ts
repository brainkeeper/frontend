import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
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
import { SmallPersonCardComponent } from './components/session_screen/small-person-card/small-person-card.component';
import { BigPersonCardComponent } from './components/session_screen/big-person-card/big-person-card.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PersonsComponent } from './components/persons/persons.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { StartComponent } from './components/start/start.component';
import { PersonListItemComponent } from './components/person-list-item/person-list-item.component';
import { PersonEditorComponent } from './components/person-editor/person-editor.component';
import { DialogConfirmDeleteComponent } from './components/dialogs/dialog-confirm-delete/dialog-confirm-delete.component';
import { DialogConfirmExitComponent } from './components/dialogs/dialog-confirm-exit/dialog-confirm-exit.component';

@NgModule({
  declarations: [
    AppComponent,
    BigPersonCardComponent,
    GridComponent,
    PersonNameComponent,
    SmallPersonCardComponent,
    SettingsComponent,
    StatisticsComponent,
    PersonsComponent,
    NavigationBarComponent,
    StartComponent,
    PersonListItemComponent,
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
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
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
