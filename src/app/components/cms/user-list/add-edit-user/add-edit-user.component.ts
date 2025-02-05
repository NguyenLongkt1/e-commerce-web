import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-add-edit-user',
  standalone: false,
  
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss'
})
export class AddEditUserComponent implements OnInit {
  
  constructor(private formBuilder:FormBuilder,private httpClient: HttpClient,
      private location: Location,private modal: NzModalService,private router:Router,
      private message: NzMessageService,protected activatedRoute: ActivatedRoute){
    
    this.activatedRoute.params.subscribe(params=>{
      if('id' in params){
        this.id = params['id'];
        this.isView = this.activatedRoute.snapshot.url[0].path === 'detail'
      }
      console.log('isView: ',this.isView,this.id)
    })    
        
    this.addEditForm = formBuilder.group({
      fullName: ['',Validators.required],
      username: ['',Validators.required],
      gender: [''],
      phoneNumber: ['',Validators.required],
      email: [''],
      address: ['',Validators.required],
      status: [''],
      birthday: ['']
    })
  }
  isView = false;
  id:any;
  addEditForm: FormGroup;
  confirmModal?: NzModalRef;

  setParam(form:FormGroup){
    let params: { [key: string]: any } = {}; 
    for(let key in form.controls){
      let value = form.get(key)?.value;
      if(typeof(value) == 'string'){
        value = value.trim();
      }
      params[key] = value;
    }

    return params;
  }
  
  doCreateUser(){
    console.log('httpParams: ',this.setParam(this.addEditForm));
    let param = this.setParam(this.addEditForm);
    this.httpClient.post(environment.apiUrl+'/users/command/users',param).subscribe((e:any)=>{
      this.router.navigate(['/cms/user']);
      this.message.success('Thêm mới người dùng thành công')
    })
  }

  back(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xác nhận',
      nzContent: 'Dữ liệu chưa được lưu lại, bạn có muốn hủy bỏ?',
      nzOnOk: () => {
        this.router.navigate(['/cms/user'])
      }
    });
  }

  doChangeFile(event:any){
    console.log('file: ',event)
  }

  ngOnInit(): void {
    
  }
}
