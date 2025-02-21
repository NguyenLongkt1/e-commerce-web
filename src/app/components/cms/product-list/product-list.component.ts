import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../../../models/user-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductModel } from '../../../models/product-model';

@Component({
  selector: 'app-product-list',
  standalone: false,
  
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  public constructor(private formBuilder:FormBuilder, private httpClient:HttpClient,
    private router:Router,private modal: NzModalService,private message: NzMessageService){
    this.searchForm = this.formBuilder.group({
      name: [''],
      code: [''],
      categoryId: [''],
      shopId: ['']
    });
  }
  searchForm: FormGroup;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly ProductModel[] = [];
  listOfCurrentPageData: readonly UserModel[] = [];
  setOfCheckedId = new Set<number>();
  actionType:any;
  confirmModal?: NzModalRef;
  lstCategory:any[] = [];
  lstShop:any[] = [];

  doSearchData(){
    let param = new HttpParams()
    .set('name', this.searchForm.get('name')?.value?.trim())
    .set('code', this.searchForm.get('code')?.value?.trim())
    .set('categoryId', this.searchForm.get('categoryId')?.value)
    .set('shopId', this.searchForm.get('shopId')?.value);
    this.httpClient.get(environment.apiUrl+'/products/command/products',{
      params: param
    }).subscribe((e:any)=>{
      this.listOfData = e;
      console.log('call search product')
    })
  }

  deleteUser(id:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xác nhận',
      nzContent: 'Bạn có muốn xóa người dùng này?',
      nzOnOk: () => {
        this.httpClient.delete(environment.apiUrl+'/products/command/products/'+id).subscribe((e:any)=>{
          this.message.success('Xóa người dùng thành công');
          this.doSearchData();
        })
      }
    });
  }

  routeToAddPage(){
    this.router.navigate(["/cms/product",'add'])
  }

  routeToEditPage(id:any){
    this.router.navigate(["/cms/product/edit/"+id])
  }

  viewDetail(id:any){
    this.router.navigate(["/cms/product/detail/"+id])
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getShopList();
    this.doSearchData();
  }

  getCategoryList(){
    this.httpClient.get(environment.apiUrl+'/categories/category').subscribe((e:any)=>{
        console.log('retrieve categories: ',e);
        this.lstCategory = e;
    })
  }

  getShopList(){
    this.httpClient.get(environment.apiUrl+'/shops/api/shops').subscribe((e:any)=>{
        console.log('retrieve shops: ',e);
        this.lstShop = e.content;
    })
  }

  onCategoryChange(event: any){
    console.log("onCategoryChange ", event)
    if (event === null) {
      this.searchForm.get("categoryId")?.setValue('');
    }
  }

  onShopChange(event: any){
    console.log("onShopChange ", event)
    if (event === null) {
      this.searchForm.get("shopId")?.setValue('');
    }
  }

}
