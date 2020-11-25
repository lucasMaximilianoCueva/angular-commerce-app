import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],

})
export class ForgotPasswordComponent {

  userEmail = new FormControl('');

  constructor(private authservice: AuthService, private router: Router)  { }

  async  onReset() {
    try{
    const email = this.userEmail.value;
    await  this.authservice.resetPassword(email);
    this.router.navigate(['login']);
    }
    catch (error) {
      console.log('error');
    }
  }
}
