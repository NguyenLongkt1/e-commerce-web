import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectCartService } from '../../../subject-services/behavior-subject-cart.service';
import { LandingBaseComponent } from '../../../base/landing-base';
import { BehaviorSubjectModalService } from '../../../subject-services/behavior-subject-modal.service';
import { Router } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-top-navigation',
  standalone: false,
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.scss'
})
export class TopNavigationComponent extends LandingBaseComponent implements OnInit{

  constructor(private behaviorSubjectCartService:BehaviorSubjectCartService,
      private behaviorSubjectModalService:BehaviorSubjectModalService,
      private router:Router){
    super();

    this.isLogined = sessionStorage.getItem('token') ? true : false;
    this.behaviorSubjectCartService.itemCount$.subscribe(count => {
      this.countCartItem = count;
    });

    this.behaviorSubjectModalService.showModalLoginState$.subscribe(value=>{
      this.visible = value
    })
  }
  visible = false;
  countCartItem = 0;
  isLogined = false;

  showDialogLogin(){
    this.behaviorSubjectModalService.openModal()
  }

  handleCancel(){
    this.behaviorSubjectModalService.closeModal()
  }

  handleOk(){}

  routeToCart(){
    this.router.navigate(['/landing/cart'])
  }

  showCart(){
    //bind(this) để giữ context, tránh lỗi gọi this.visible,... thì this bị undefined
    super.checkLoginBeforeChangeRoute(this.showDialogLogin.bind(this),this.routeToCart.bind(this))
  }

  ngOnInit(): void {
    let totalQuantity = sessionStorage.getItem('quantity_on_cart');
    if(totalQuantity){
      this.behaviorSubjectCartService.firstCountItem(Number.parseInt(totalQuantity))
    }
  }

}
