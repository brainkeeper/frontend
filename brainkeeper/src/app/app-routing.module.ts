import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './components/session_screen/grid/grid.component';
import { PersonsComponent } from './components/persons/persons.component';
import { StartComponent } from './components/start/start.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'persons', component: PersonsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
