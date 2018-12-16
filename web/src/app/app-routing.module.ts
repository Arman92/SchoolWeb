import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassListComponent } from './components/class-list/class-list/class-list.component';

const routes: Routes = [
  {path: 'class-list', component: ClassListComponent},
  {
    path: '',
    redirectTo: '/class-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
