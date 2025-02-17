import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, Location, formatDate } from '@angular/common';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-edit-product',
  standalone: false,
  
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent implements OnInit {
  
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
      description: [''],
      price: ['',Validators.required],
      categoryId: ['',Validators.required]
    })
  }
  isView = false;
  id:any;
  addEditForm: FormGroup;
  confirmModal?: NzModalRef;
  choosenFiles:any = [];
  lstFile:any;
  lstRemovedFileId:any = []

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
    params['lstRemovedFileId']=this.lstRemovedFileId;
    return params;
  }
  
  doCreateOrUpdateProduct(){
    let param = this.setParam(this.addEditForm);
    const formData = new FormData();
    if (this.choosenFiles && this.choosenFiles.length > 0) {
      for (let i = 0; i < this.choosenFiles.length; i++) {
        formData.append("files", this.choosenFiles[i]);
      }
    }
    
    formData.append("data",JSON.stringify(param));
    console.log("formdata: ", formData)

    this.httpClient.post(environment.apiUrl+'/products/command/products',formData).subscribe((e:any)=>{
      this.router.navigate(['/cms/product']);
      if(this.id){
        this.message.success('Cập nhật sản phẩm thành công')
      }else{
        this.message.success('Thêm mới sản phẩm thành công')
      }
    })
  }

  back(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xác nhận',
      nzContent: 'Dữ liệu chưa được lưu lại, bạn có muốn hủy bỏ?',
      nzOnOk: () => {
        this.router.navigate(['/cms/product'])
      }
    });
  }

  retrieveProduct(){
    this.httpClient.get(environment.apiUrl+'/products/command/products/'+this.id).subscribe((e:any)=>{
        console.log('retrieve user: ',e);
        for(let key in e){
          if(key == 'lstFile'){
            this.lstFile = e[key];
          } else {
            this.addEditForm.get(key)?.setValue(e[key]);
          }
        }
    })
  }

  doChangeFile(event:any){
    console.log('fileChange: ',event);
    this.choosenFiles = event;
  }

  doDeleteFile(event:any){
    console.log('fileDeleteId: ',event);
    this.lstRemovedFileId.push(event);
  }

  ngOnInit(): void {
    if(this.id){
      this.retrieveProduct();
    }
  }
}
