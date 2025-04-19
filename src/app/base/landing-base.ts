import { Component } from '@angular/core';


@Component({
  selector: 'landing-base',
  standalone: false,
  template: '',
})
export class LandingBaseComponent {

  constructor(){
  }

  checkLoginBeforeChangeRoute(showLogin:any,nextFunc:any){
    let isLogin = sessionStorage.getItem('token') ? true : false;
    if(!isLogin){
        showLogin()
    }else{
        nextFunc()
    }
  }
}
