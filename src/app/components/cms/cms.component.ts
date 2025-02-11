import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cms',
  standalone: false,
  
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss'
})
export class CmsComponent implements OnInit{

  public constructor(private router:Router){

  }

  lstMenu:any[] = [];

  routeToPath(event:any){
    console.log('click to item: ',event);
    this.router.navigate(['/cms'+event]);
  }

  ngOnInit(): void {
    this.lstMenu = [
      {
        'id': 1,
        'name': 'Quản trị chức năng',
        'children': [
          {
            'id': 2,
            'name': 'Quản trị người dùng',
            'path': '/user'
          },
          {
            'id': 3,
            'name': 'Quản trị danh mục',
            'path': '/category'
          },
          {
            'id': 4,
            'name': 'Quản trị gian hàng',
            'path': '/shop'
          }
        ]
      },
      {
        'id': 5,
        'name': 'Quản lý sản phẩm',
        'children': [
        ]
      },
    ]
  }

}
