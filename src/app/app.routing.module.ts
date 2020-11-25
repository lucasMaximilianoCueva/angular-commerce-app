import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/shared/error/error.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EmailAuthComponent } from './auth/email-auth/email-auth.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CanEditGuard } from './components/shared/guards/can-edit.guard';
import { CanSuscriptorGuard } from './components/shared/guards/can-suscriptor.guard';
import { CanAdminGuard } from './components/shared/guards/can-admin.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'products',
  component: ShoppingCartComponent,
  canActivate: [CanEditGuard],
},
{
  path: 'contact',
  component: ContactComponent,
},
  {
  path: 'login',
  component: LoginComponent,
},
{
  path: 'sign-up',
  component: SignUpComponent,
},
{
  path: 'email-auth',
  component: EmailAuthComponent,
},
{
  path: 'forgot-password',
  component: ForgotPasswordComponent,
},
{
  path: 'admin',
  loadChildren: () =>
  import('./admin/admin.module').then((m) => m.AdminModule),
  canActivate: [CanAdminGuard],
},
{
  path: 'editor',
  loadChildren: () =>
  import('./editor/editor.module').then((m) => m.EditorModule),
  canActivate: [CanEditGuard],
},
{
  path: 'suscriptor',
  loadChildren: () =>
  import('./suscriptor/suscriptor.module').then((m) => m.SuscriptorModule),
  canActivate: [CanSuscriptorGuard],
},
{
  path: 'error',
  component: ErrorComponent,
},
{
  path: '**',
  redirectTo: 'error',
},
];



@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
   RouterModule
  ],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
