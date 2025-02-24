import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: false,
  
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit{

  @Input() picture:any;
  @Input() productName: any;
  @Input() productPrice: any;
  @Input() star:any;
  @Input() readonlyStar:any;
  @Input() productId:any;

  constructor(private router:Router){

  }

  routeForDetail(id:any){
    this.router.navigate(['/landing/product-detail/'+id])
  }

  ngOnInit(): void {
    
  }
}
