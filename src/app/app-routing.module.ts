import { NgModule } from '@angular/core';
import {AuthenticationComponent} from './authentication/authentication.component';
import {RouterModule, Routes} from '@angular/router';
import {DiariesEditComponent} from './diaries/diaries-edit/diaries-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  { path: 'diaries/edit', component: DiariesEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
