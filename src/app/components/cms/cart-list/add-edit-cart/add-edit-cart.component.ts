import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-add-edit-cart',
  standalone: false,
  templateUrl: './add-edit-cart.component.html',
  styleUrl: './add-edit-cart.component.scss'
})
export class AddEditCartComponent implements OnInit{

  constructor(private formBuilder:FormBuilder,protected activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,private modal: NzModalService){
    this.activatedRoute.params.subscribe(params=>{
      if('id' in params){
        this.id = params['id'];
        this.isView = this.activatedRoute.snapshot.url[0].path === 'detail'
      }
    })    
    this.addEditForm = this.formBuilder.group({
      name: ['',Validators.required],
      code: ['',Validators.required],
      userId: ['',Validators.required],
      description: ['']
    })
  }
  isShowModal =false;
  isView = false;
  id:any;
  addEditForm: FormGroup;
  shopId:any;

  listCustomer:any = [];
  listProductSelected:any=[];
  lstShop:any[] = [];
  listProductInModal:any=[];

  getShopList(){
    this.httpClient.get(environment.apiUrl+'/shops/api/shops').subscribe((e:any)=>{
        console.log('retrieve shops: ',e);
        this.lstShop = e.content;
    })
  }

  onShopChange(id: any){
    this.httpClient.get(environment.apiUrl+'/products/command/products/get-by-shop/'+id).subscribe((e:any)=>{
      this.listProductInModal = e.content;
  })
  }

  addProduct(){
    this.isShowModal = true;
  }

  onCustomerChange(event:any){

  }
  doCreateOrUpdateCart(){

  }
  deleteData(productId:any){

  }
  back(){
    
  }

  onCancelModal(){
    this.isShowModal = false;
  }

  onOkModal(){

  }

  ngOnInit(): void {
   this.getShopList()
  }
}
