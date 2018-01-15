import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { LoginService } from './login.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare let CryptoJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  loginData: any;

  constructor(
    public router: Router,
    private loginService: LoginService,
    private toastr: ToastsManager,
    private container: ViewContainerRef
  ) {
    this.loginData = {};
    this.toastr.setRootViewContainerRef(this.container);
  }

  ngOnInit() { }

  up(form: any): any {
    if (!((this.loginData.email) && (this.loginData.email.length > 2)) &&
         (!(this.loginData.password) && (this.loginData.password.length > 5))) return;

    this.loginService.authentication(this.loginData).subscribe(
      (data: any) => {
        let token = CryptoJS.AES.encrypt(data.token, this.loginService.getEnv().cryptKey);
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      (err: any) => {
        console.error(err);
        this.toastr.warning(err.mensagem);
      }
    );
  }

  down(): any {
    if (this.loginService.isAuthenticated()) {
      this.loginService.logout().subscribe(
        (data: any) => {
          console.log(data);
          localStorage.removeItem('token');
        },
        (err: any) => {
          console.error(err);
        }
      );
    }

    this.router.navigate(['/login']);
  }

}
