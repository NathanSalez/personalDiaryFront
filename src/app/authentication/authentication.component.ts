import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  hide = true;
  email?: string;
  password?: string;
  badCredentials = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isLogged()) {
      this.router.navigate(['pokedex']);
    }
  }

  getToken(): void {
    if (this.email && this.password) {
      // this.authenticationService.getAccessToken(this.email, this.password).subscribe(() => {
      this.authenticationService.getAccessToken('dctime02@gmail.com', 'romain').subscribe(() => {
        this.router.navigate(['team']);
        this.badCredentials = !this.authenticationService.isLogged();
      });
    }

  }

}
