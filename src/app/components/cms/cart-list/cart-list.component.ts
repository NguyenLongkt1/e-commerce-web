import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CartModel } from '../../../models/cart-model';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-cart-list',
  standalone: false,
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent {
  public constructor(private formBuilder:FormBuilder, private httpClient:HttpClient,
    private router:Router, private modal: NzModalService, private message: NzMessageService){
    this.searchForm = this.formBuilder.group({
      userId: [''],
      description: ['']
    });
  }
  searchForm: FormGroup;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly CartModel[] = [];
  listOfCurrentPageData: readonly CartModel[] = [];
  setOfCheckedId = new Set<number>();
  actionType:any;
  confirmModal?: NzModalRef;
  onCurrentPageDataChange(ev:any){

  }
  onAllChecked(ev:any){

  }
  onItemChecked(id:number,ev:any){

  }

  async doSearchData(){
    let param = new HttpParams()
    .set('name', this.searchForm.get('name')?.value?.trim());
    this.httpClient.get(environment.apiUrl+'/carts/cart',{
      params: param
    }).subscribe((e:any)=>{
      this.listOfData = e;
    })
  }

  routeToAddPage(){
    this.router.navigate(["/cms/cart",'add'])
  }

  routeToEditPage(id:any){
    this.router.navigate(["/cms/cart/edit/"+id])
  }

  viewDetail(id:any){
    this.router.navigate(["/cms/cart/detail/"+id])
  }

  ngOnInit(): void {
    this.doSearchData();
  }

  deleteData(id: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xác nhận',
      nzContent: 'Bạn có chắc chắn muốn xóa không?',
      nzOnOk: () => {
        this.httpClient.delete(environment.apiUrl+'/carts/card/'+id,).subscribe((e:any)=>{
          this.doSearchData();
          this.message.success('Xóa danh giỏ hàng thành công')
        })
      }
    });
  }
}
