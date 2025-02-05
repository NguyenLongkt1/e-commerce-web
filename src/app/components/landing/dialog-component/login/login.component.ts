import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../../environments/environment.development';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private httpClient:HttpClient,
          private formBuilder: FormBuilder,
          private router:Router){
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    });
  }
  loginForm: FormGroup;
  passwordVisible = false;

  onLogin(){
    let params = {
      'username': this.loginForm.get('userName')?.value?.trim(),
      'password': this.loginForm.get('password')?.value?.trim()
    }
    this.httpClient.post(environment.apiUrl+'/auth/login',params).subscribe((e:any)=>{
      if(e.authenticated && e.authenticated == true){
        sessionStorage.setItem('token',e?.token);
        this.router.navigate(["/cms/user"])
      }
      
    })
  }
}
