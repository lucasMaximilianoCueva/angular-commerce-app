import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  hide = true;
  private isValidEmail = /\S+@\S+\.\S+/;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.isValidEmail)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authservice: AuthService, private router: Router) { }

async onGoogle() {
    try{
      const user = await this.authservice.loginGoogle();
      if(user) {
        this.checkUserisVerified(user);
      }
    }
    catch (error) {
      this.router.navigate(['error']);
      }
    }


  async  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password} = this.loginForm.value;
    try {
      const user = await this.authservice .login( email, password);
      this.checkUserisVerified(user);
    }
    catch (error) {
      this.router.navigate(['error']);
    }
  }
  private checkUserisVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['home']);
    }else if (user) {
      this.router.navigate(['email-auth']);
    }else {
      this.router.navigate(['sign-up']);
    }
  }

  getErrorMessage(field: string): string {
    let message;
    if (this.loginForm.get(field).errors.required) {
      message = 'Enter a value';
    }else if (this.loginForm.get(field).hasError('pattern')){
      message = 'Enter a valid email';
    }else if (this.loginForm.get(field).hasError('minlength')){
      const minLength = this.loginForm.get(field).errors?.minlength.requiredLength;
      message = `The password must be longer than ${minLength} characters`;
  }
  return message;
}

  isValidField(field: string): boolean {
    return ( ( this.loginForm.get(field).dirty || this.loginForm.get(field).touched ) && !this.loginForm.get(field).valid);
  }
}
