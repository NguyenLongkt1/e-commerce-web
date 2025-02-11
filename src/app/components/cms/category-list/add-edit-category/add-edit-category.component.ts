import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, Location, formatDate } from '@angular/common';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-edit-category',
  standalone: false,
  templateUrl: './add-edit-category.component.html',
  styleUrl: './add-edit-category.component.scss'
})
export class AddEditCategoryComponent implements OnInit {
  
  constructor(private formBuilder:FormBuilder,private httpClient: HttpClient,
      private location: Location,private modal: NzModalService,private router:Router,
      private message: NzMessageService,protected activatedRoute: ActivatedRoute){
    
    this.activatedRoute.params.subscribe(params=>{
      if('id' in params){
        this.id = params['id'];
        this.isView = this.activatedRoute.snapshot.url[0].path === 'detail'
      }
    })    
    this.addEditForm = formBuilder.group({
      name: ['',Validators.required],
      code: ['',Validators.required],
      description: ['']
    })
  }
  isView = false;
  id:any;
  addEditForm: FormGroup;
  confirmModal?: NzModalRef;
  choosenFile:any;
  avatarPath:any;

  setParam(form:FormGroup){
    let params: { [key: string]: any } = {}; 
    for(let key in form.controls){
      let value = form.get(key)?.value;
      if(typeof(value) == 'string'){
        value = value.trim();
      }

      params[key] = value;
    }
    if(this.id){
      params['id']=this.id;
    }
    return params;
  }
  
  doCreateOrUpdateCategory(){
    let param = this.setParam(this.addEditForm);
    const formData = new FormData();
    if(this.choosenFile){
      formData.append("file",this.choosenFile);
    }
    
    formData.append("data",JSON.stringify(param))

    this.httpClient.post(environment.apiUrl+'/categories/category',formData).subscribe((e:any)=>{
      this.router.navigate(['/cms/category']);
      if(this.id){
        this.message.success('Cập nhật danh mục thành công')
      }else{
        this.message.success('Thêm mới danh mục thành công')
      }
    })
  }

  back(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xác nhận',
      nzContent: 'Dữ liệu chưa được lưu lại, bạn có muốn hủy bỏ?',
      nzOnOk: () => {
        this.router.navigate(['/cms/category'])
      }
    });
  }

  retrieveCategory(){
    this.httpClient.get(environment.apiUrl+'/categories/category/'+this.id).subscribe((e:any)=>{
        for(let key in e){
          if(key == 'thumbnail'){
            this.avatarPath = e[key];
          }
          this.addEditForm.get(key)?.setValue(e[key]);
        }
    })
  }

  doChangeFile(event:any){
    console.log('file: ',event);
    this.choosenFile = event;
  }

  ngOnInit(): void {
    if(this.id){
      this.retrieveCategory();
    }
  }
}

