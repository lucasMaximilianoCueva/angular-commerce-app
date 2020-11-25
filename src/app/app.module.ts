import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FiltersComponent } from './components/shopping-cart/filters/filters.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { ProductItemComponent } from './components/shopping-cart/product-list/product-item/product-item.component';
import { CartItemComponent } from './components/shopping-cart/cart/cart-item/cart-item.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AppRoutingModule } from './app.routing.module';
import { ErrorComponent } from './components/shared/error/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CutPipe } from './cut.pipe';
import { environment } from 'src/environments/environment';
import { EmailAuthComponent } from './auth/email-auth/email-auth.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AdminModule } from './admin/admin.module';
import { EditorModule } from './editor/editor.module';
import { SuscriptorModule } from './suscriptor/suscriptor.module';
import { AuthService } from './auth/auth.service';
import { CanEditGuard } from './components/shared/guards/can-edit.guard';
import { CanAdminGuard } from './components/shared/guards/can-admin.guard';
import { CanSuscriptorGuard } from './components/shared/guards/can-suscriptor.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ShoppingCartComponent,
    FiltersComponent,
    ProductListComponent,
    CartComponent,
    ProductItemComponent,
    CartItemComponent,
    LoginComponent,
    HomeComponent,
    ContactComponent,
    ErrorComponent,
    SignUpComponent,
    CutPipe,
    EmailAuthComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AdminModule,
    EditorModule,
    SuscriptorModule
  ],
  providers: [AuthService, CanEditGuard, CanAdminGuard, CanSuscriptorGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
 