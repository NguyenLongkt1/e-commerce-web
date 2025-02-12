import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-home-page',
  standalone: false,
  
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  constructor(private httpClient:HttpClient){}
  lstCategory: any = [];
  lstBanner: any = [];
  lstProduct: any = [];

  async getListCategory(){
    let param = new HttpParams();
    this.httpClient.get(environment.apiUrl+'/categories/category/public/all',{
      params: param
    }).subscribe((e:any)=>{
      this.lstCategory = e;
    })
  }

  ngOnInit(): void {
    this.lstBanner = [
      {id: 1,img: '/img/banner-deal.png'},
      {id: 2,img: '/img/banner-deal2.png'},
      {id: 3,img: '/img/banner-deal3.png'}
    ];

    this.lstProduct = [
      {id: 1, firstImage: '/img/test.png', name: 'Sản phẩm 1', rating: 3.5, price: 100000},
      {id: 2, firstImage: '/img/test.png', name: 'Sản phẩm 2', rating: 4.5, price: 120000},
      {id: 3, firstImage: '/img/test.png', name: 'Sản phẩm 3', rating: 4, price: 60000},
      {id: 4, firstImage: '/img/test.png', name: 'Sản phẩm 4', rating: 5, price: 72000},
      {id: 5, firstImage: '/img/test.png', name: 'Sản phẩm 5', rating: 1, price: 990000},
      {id: 6, firstImage: '/img/test.png', name: 'Sản phẩm 6', rating: 5, price: 500000},
    ]

    this.getListCategory()
  }

}
