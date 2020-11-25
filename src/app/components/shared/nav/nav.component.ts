import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],

})
export class NavComponent {

  public user$: Observable<User> = this.authservice.angularfire.user;
 
  constructor(private authservice: AuthService, private router: Router) { }

  async  onLogout() {
    try {
      await this.authservice.logOut();
      this.router.navigate(['login']);
    }
    catch (error) {
      this.router.navigate(['error']);
    }
  }
}
