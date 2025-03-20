import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private httpClient:HttpClient,
        private formBuilder:FormBuilder){
    this.activatedRoute.params.subscribe(params=>{
      if('id' in params){
        this.id = params['id'];
      }
    });
    this.formRating = this.formBuilder.group({

    });  
  }

  @ViewChild('contentElement') contentElement!: ElementRef;
  showToggle: boolean = false;

  productDetail:any;
  choosenImg:any;
  id:any;
  lstFile:any = [];
  formRating:FormGroup;
  buyValue = 1;
  textContent:any="Xem thêm";

  async getProductDetail(){
    this.httpClient.get(environment.apiUrl+'/products/command/products/'+this.id).subscribe((e:any)=>{
      this.productDetail = e;
      console.log('productDetail: ',this.productDetail)
    })
  }

  setBuyValue(value:any){
    this.buyValue = value;
  }
  expandData(){
    let container = document.querySelector(".content");
    console.log('test expand: ',container)
    if(container != null){
      container.classList.toggle("expanded");
      this.textContent = container.classList.contains("expanded") ? "Thu gọn" : "Xem thêm";
    }
  }

  ngAfterViewInit(): void {
    // Kiểm tra kích thước của phần tử sau khi view được khởi tạo
    const contentHeight = this.contentElement.nativeElement.offsetHeight;

    // Kiểm tra xem phần tử có chiều cao vượt quá 300px không
    if (contentHeight > 300) {
      this.showToggle = true; 
    } else {
      this.showToggle = false;
    }
  }

  ngOnInit(): void {
    this.choosenImg = '/img/test.png'
    this.lstFile = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6},{id: 7}];
    this.getProductDetail();
  }

}
