import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-group',
  standalone: false,
  
  templateUrl: './product-group.component.html',
  styleUrl: './product-group.component.scss'
})
export class ProductGroupComponent implements OnInit{

    constructor(){}

    @Input() title:any;
    @Input() lstProduct: any;

    ngOnInit(): void {
    }
}
