import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../../../models/user-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit{

  public constructor(private formBuilder:FormBuilder, private httpClient:HttpClient,
    private router:Router){
    this.searchForm = this.formBuilder.group({
      fullName: [''],
      username: [''],
      gender: ['']
    });
  }
  searchForm: FormGroup;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly UserModel[] = [];
  listOfCurrentPageData: readonly UserModel[] = [];
  setOfCheckedId = new Set<number>();
  actionType:any;
  onCurrentPageDataChange(ev:any){

  }
  onAllChecked(ev:any){

  }
  onItemChecked(id:number,ev:any){

  }

  async doSearchData(){
    let param = new HttpParams()
    .set('fullName', this.searchForm.get('fullName')?.value?.trim())
    .set('username', this.searchForm.get('username')?.value?.trim())
    .set('gender', this.searchForm.get('gender')?.value?.trim());
    this.httpClient.get(environment.apiUrl+'/users/query/users',{
      params: param
    }).subscribe((e:any)=>{
      this.listOfData = e;
      console.log('call search user')
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

}
