import { Component, OnInit } from '@angular/core';
import { LandingBaseComponent } from '../../../base/landing-base';
import { CartModel } from '../../../models/cart-model';
import { BehaviorSubjectCartService } from '../../../subject-services/behavior-subject-cart.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

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
  }

  listItem:CartModel[] = [];
  checked=false;
  indeterminate = false;
  confirmModal?: NzModalRef;

  setOfCheckedId = new Set<number>();

  onCurrentPageDataChange(ev:any){

  }
  onAllChecked(ev:any){

  }
  onItemChecked(id:number,ev:any){

  }

  doDeleteItem(itemId:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xóa sản phẩm',
      nzContent: 'Bạn có muốn xóa sản phẩm đang chọn?',
      nzOnOk: () => {
        // this.httpClient.delete(environment.apiUrl+'/shops/api/shops/'+id).subscribe((e:any)=>{
        //   this.message.success('Xóa gian hàng thành công');
        //   this.doSearchData();
        // })
        this.doDeleteItem(1);
      }
    });
  }

  setBuyValue(ev:any){
    console.log('choosen ev: ',ev)
    if(ev == 0){
      this.doDeleteItem(1)
    }
  }

  ngOnInit(): void {
    
  }

}
