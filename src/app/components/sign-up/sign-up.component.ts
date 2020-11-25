import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent implements OnInit {

  registerForm = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authservice: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  async  onRegister() {
    const {email, password} = this.registerForm.value;
    try {
      const user = await this.authservice.register(email, password);
      if (user) {
        this.checkUserisVerified(user);
      }
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
}
