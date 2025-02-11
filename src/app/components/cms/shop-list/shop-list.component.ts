import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ShopModel } from '../../../models/shop-model';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-shop-list',
  standalone: false,
  
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss'
})
export class ShopListComponent {
  public constructor(private formBuilder:FormBuilder, private httpClient:HttpClient,
    private router:Router,private modal: NzModalService,private message: NzMessageService){
    this.searchForm = this.formBuilder.group({
      shopName: [''],
      status: ['']
    });
  }
  searchForm: FormGroup;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly ShopModel[] = [];
  listOfCurrentPageData: readonly ShopModel[] = [];
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
    .set('shopName', this.searchForm.get('shopName')?.value?.trim() ?? undefined)
    .set('status', this.searchForm.get('status')?.value ?? undefined);

    this.httpClient.get(environment.apiUrl+'/shops/api/shops',{
      params: param
    }).subscribe((e:any)=>{
      this.listOfData = e['content'] ?? [];
      console.log('call search shop')
    })
  }

  deleteShop(id:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xác nhận',
      nzContent: 'Bạn có muốn xóa gian hàng này?',
      nzOnOk: () => {
        this.httpClient.delete(environment.apiUrl+'/shops/api/shops/'+id).subscribe((e:any)=>{
          this.message.success('Xóa gian hàng thành công');
          this.doSearchData();
        })
      }
    });
  }

  routeToAddPage(){
    this.router.navigate(["/cms/shop",'add'])
  }

  routeToEditPage(id:any){
    this.router.navigate(["/cms/shop/edit/"+id])
  }

  viewDetail(id:any){
    this.router.navigate(["/cms/shop/detail/"+id])
  }

  ngOnInit(): void {
    this.doSearchData();
  }
}
