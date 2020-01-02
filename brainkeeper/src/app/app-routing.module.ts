import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './components/session_screen/grid/grid.component';
import { PersonsComponent } from './components/persons/persons.component';
import { StartComponent } from './components/start/start.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PersonEditorComponent } from './components/person-editor/person-editor.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'game', component: GridComponent },
  { path: 'persons', component: PersonsComponent },
  { path: 'person/new', component: PersonEditorComponent},
  { path: 'person/:id', component: PersonEditorComponent},
  { path: 'settings', component: SettingsComponent },
  { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
