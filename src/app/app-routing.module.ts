import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'registration', component: RegistrationDialogComponent },
  { path: 'registrations', component: RegistrationComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
