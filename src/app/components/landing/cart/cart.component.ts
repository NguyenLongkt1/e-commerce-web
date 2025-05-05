import { Component, OnInit } from '@angular/core';
import { LandingBaseComponent } from '../../../base/landing-base';
import { CartModel } from '../../../models/cart-model';
import { BehaviorSubjectCartService } from '../../../subject-services/behavior-subject-cart.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: false,
  
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent extends LandingBaseComponent implements OnInit {

  constructor(private behaviorSubjectCartService:BehaviorSubjectCartService,
    private modal: NzModalService, private message: NzMessageService,private httpClient:HttpClient){
    super();
    this.behaviorSubjectCartService.fakeItem$.subscribe(item => {
      this.listItem.push(item);
    });

    this.checkSelectedItem.subscribe(values => {
      this.countItemBuy = values.length;
      this.calculatePrice(values)
      this.calTotalPrice()
    });
  }

  listItem:any = [];
  checked=false;
  indeterminate = false;
  confirmModal?: NzModalRef;
  selectedItem:any=[];
  countItemBuy=0;
  totalPay = 0;
  itemId:any;
  private checkSelectedItem = new BehaviorSubject<any>([]);

  setOfCheckedId = new Set<number>();

  getCart(){
    let cartId = sessionStorage.getItem('cartId') ?? '0';
    let params = {
      'cartId': cartId
    }
    console.log('get cart: ',params)
    this.httpClient.get(environment.apiUrl+'/carts/api/carts/get-products-in-cart',{
      params: params
    }).subscribe(data=>{
      console.log('data cart: ',data);
      this.listItem = data;
    })
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(ev:any){

  }

  onAllChecked(ev:any){
    if(ev){
      this.selectedItem=this.listItem;
      this.listItem.forEach((item:any) => this.updateCheckedSet(item.id, true));
    }
    else{
      this.selectedItem = [];
      this.listItem.forEach((item:any) => this.updateCheckedSet(item.id, false));
    }
    console.log('check selected item: ',this.selectedItem)
    this.checkSelectedItem.next(this.selectedItem);
    
  }
  onItemChecked(id:number,ev:any){
    let item = this.listItem.filter((e:any)=>e.id==id);
    if(item){
      if(ev)
        this.selectedItem.push(item[0])
      else
        this.selectedItem.splice(item[0],1)
    }
    console.log('change selected item: ',this.selectedItem)
    this.checkSelectedItem.next(this.selectedItem);
  }

  calculatePrice(vals:any){
    if(vals && vals.length > 0){
      for(let item of vals){
        let quantity = item.quantity ?? 1
        // this.totalPay+= (item.price ?? 0) * quantity
        item.totalPriceItem = (item.price ?? 0) * quantity;
      }
    }
  }

  calTotalPrice(){
    this.totalPay = 0;
    if(this.selectedItem && this.selectedItem.length > 0){
      for(let item of this.selectedItem){
        this.totalPay += item.totalPriceItem
      }
    }
  }

  doDeleteItem(itemId:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xóa sản phẩm',
      nzContent: 'Bạn có muốn xóa sản phẩm đang chọn?',
      nzOnOk: () => {
        let param = new HttpParams();
        param = param.set('cartId',sessionStorage.getItem('cartId') ?? '0').set('productId',itemId)
        this.httpClient.delete(environment.apiUrl+'/carts/api/carts/remove-product-from-cart',{
          params: param
        }).subscribe((e:any)=>{
          // this.doSearchData();
        })
        console.log('testtt')
        this.selectedItem = this.selectedItem.filter((e:any)=>e.id != itemId)
        this.listItem = this.listItem.filter((e:any)=>e.id != itemId)
      },
      nzOnCancel: ()=>{
        
      }
    });
  }

  setBuyValue(ev:any){
    console.log('choosen ev: ',ev)
    this.selectedItem.map((e:any)=>{
      if(e.id == ev.id){
        e.quantity = ev.quantity
      }
    })

    this.listItem = this.listItem.map((e:any)=>{
      if(e.id == this.itemId){
        e.quantity = ev.quantity
      }
      return e;
    })

    if(ev && ev.quantity == 0){
      this.doDeleteItem(ev.id);
    }
    this.checkSelectedItem.next(this.selectedItem);
  }

  setItemId(e:any){
    this.itemId = e;
  }

  ngOnInit(): void {
    this.getCart();
    console.log('itemId selected: ',this.itemId)
  }

}
