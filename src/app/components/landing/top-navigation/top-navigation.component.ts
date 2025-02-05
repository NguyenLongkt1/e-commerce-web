import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-navigation',
  standalone: false,
  
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.scss'
})
export class TopNavigationComponent implements OnInit{

  constructor(){}

  visible = false;

  showDialogLogin(){
    this.visible = true;
  }

  handleCancel(){
    this.visible = false;
  }

  handleOk(){}

  ngOnInit(): void {
    
  }

}
