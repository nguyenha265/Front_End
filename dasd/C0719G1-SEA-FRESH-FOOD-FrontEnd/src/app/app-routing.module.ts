import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateUserComponent} from './FRESH-FOOD/user/create-user/create-user.component';
import {LoginUserComponent} from './FRESH-FOOD/user/login-user/login-user.component';



const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginUserComponent
  },
  {
    path: 'registered',
    component: CreateUserComponent
  },
  {
    path: 'auth/login/registered',
    component: CreateUserComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
