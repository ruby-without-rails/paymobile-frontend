import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpUtilsService } from './../shared/http-utils.service';
import { LoginService } from './login.service';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [CommonModule, FormsModule, LoginRoutingModule],
    declarations: [LoginComponent],
    providers: [HttpUtilsService, LoginService]
})
export class LoginModule {}
