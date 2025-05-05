import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../../environments/environment.development';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubjectCartService } from '../../../../subject-services/behavior-subject-cart.service';


@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private httpClient:HttpClient,
          private formBuilder: FormBuilder,
          private router:Router,
          private behaviorSubjectCartService:BehaviorSubjectCartService){
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
        let decode:any = jwtDecode(e.token);
        sessionStorage.setItem('userId',decode.userId)
        this.getUserInfo(decode.userId)
        this.router.navigate(["/cms/user"])
      }
    })
  }

  getUserInfo(userId:any){
    this.httpClient.get(environment.apiUrl+'/users/api/users/'+userId).subscribe((e:any)=>{
      if(e.cartInfo){
        sessionStorage.setItem('cartId',e.cartInfo.cartId);
        if(e.cartInfo.totalQuantity){
          sessionStorage.setItem('quantity_on_cart',e.cartInfo.totalQuantity);
          this.behaviorSubjectCartService.firstCountItem(e.cartInfo.totalQuantity)
        }
      }
    })
    
  }
}
