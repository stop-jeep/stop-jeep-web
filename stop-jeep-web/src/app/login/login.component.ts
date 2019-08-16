import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/home']);
      });
  }

}
