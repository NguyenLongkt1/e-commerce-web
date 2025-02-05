import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: false,
  
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  constructor(){}
  lstCategory: any = [];
  lstBanner: any = [];

  ngOnInit(): void {
    this.lstCategory = [
      {id: 1,name: 'Nhà Sách Tiki', img: '/img/banner-deal.png'},
      {id: 2,name: 'Nhà Cửa - Đời Sống', img: '/img/banner-deal.png'},
      {id: 3,name: 'Điện Thoại - Máy Tính Bảng', img: '/img/banner-deal.png'},
      {id: 4,name: 'Đồ chơi - Mẹ & Bé', img: '/img/banner-deal.png'},
      {id: 5,name: 'Thiết Bị Số - Phụ Kiện Số', img: '/img/banner-deal.png'},
      {id: 7,name: 'Điện Gia Dụng', img: '/img/banner-deal.png'},
      {id: 8,name: 'Làm đẹp - Sức Khỏe', img: '/img/banner-deal.png'},
      {id: 9,name: 'Ô Tô - Xe Máy - Xe Đạp', img: '/img/banner-deal.png'},
      {id: 10,name: 'Thời Trang Nữ', img: '/img/banner-deal.png'},
    ];
    this.lstBanner = [
      {id: 1,img: '/img/banner-deal.png'},
      {id: 2,img: '/img/banner-deal.png'},
      {id: 3,img: '/img/banner-deal.png'}
    ]
  }

}
