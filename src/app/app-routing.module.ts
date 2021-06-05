import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { Login1Component } from './components/login1/login1.component';
import { Register1Component } from './components/register1/register1.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/actu/create/create.component';
import { ListComponent } from './components/actu/list/list.component';
import { DetailsComponent } from './components/actu/details/details.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: Login1Component },
  { path: 'register', component: Register1Component },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ajouteractualite', component:CreateComponent },
  { path: 'actualiteslist', component:ListComponent },
  { path: 'detailsnews', component:DetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }