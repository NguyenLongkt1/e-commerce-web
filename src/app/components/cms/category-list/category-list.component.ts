import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryModel } from '../../../models/category-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit{

  public constructor(private formBuilder:FormBuilder, private httpClient:HttpClient,
    private router:Router, private modal: NzModalService, private message: NzMessageService){
    this.searchForm = this.formBuilder.group({
      name: [''],
      code: [''],
      description: ['']
    });
  }
  searchForm: FormGroup;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly CategoryModel[] = [];
  listOfCurrentPageData: readonly CategoryModel[] = [];
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
    .set('name', encodeURIComponent(this.searchForm.get('name')?.value?.trim()));
    this.httpClient.get(environment.apiUrl+'/categories/category',{
      params: param
    }).subscribe((e:any)=>{
      this.listOfData = e;
    })
  }

  routeToAddPage(){
    this.router.navigate(["/cms/category",'add'])
  }

  routeToEditPage(id:any){
    this.router.navigate(["/cms/category/edit/"+id])
  }

  viewDetail(id:any){
    this.router.navigate(["/cms/category/detail/"+id])
  }

  ngOnInit(): void {
    this.doSearchData();
  }

  deleteData(id: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xác nhận',
      nzContent: 'Bạn có chắc chắn muốn xóa không?',
      nzOnOk: () => {
        this.httpClient.delete(environment.apiUrl+'/categories/category/'+id,).subscribe((e:any)=>{
          this.doSearchData();
          this.message.success('Xóa danh mục thành công')
        })
      }
    });
  }

}
