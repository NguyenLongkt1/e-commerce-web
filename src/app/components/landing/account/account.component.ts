import { Component, OnInit } from '@angular/core';
import { LandingBaseComponent } from '../../../base/landing-base';

@Component({
  selector: 'app-account',
  standalone: false,
  
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent extends LandingBaseComponent implements OnInit{

  constructor(){
    super()
  }
  userInfo:any={}

  ngOnInit(): void {
  }
}
