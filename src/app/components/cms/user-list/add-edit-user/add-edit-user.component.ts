import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, Location, formatDate } from '@angular/common';
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
    })    
    this.addEditForm = formBuilder.group({
      fullName: ['',Validators.required],
      username: ['',Validators.required],
      gender: [''],
      phoneNumber: ['',Validators.required],
      email: [''],
      address: ['',Validators.required],
      status: [''],
      birthday: [''],
      roles: [[]]
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
      if(key == 'roles'){
        continue;
      }
      if(typeof(value) == 'string'){
        value = value.trim();
      }
      if(key == 'birthday'){
        const datePipe = new DatePipe('en-US');
        const date = new Date(value);
        value = datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
      }

      params[key] = value;
    }
    if(this.id){
      params['id']=this.id;
    }
    return params;
  }
  
  doCreateOrUpdateUser(){
    let param = this.setParam(this.addEditForm);
    const formData = new FormData();
    if(this.choosenFile){
      formData.append("file",this.choosenFile);
    }
    
    formData.append("data",JSON.stringify(param))

    this.httpClient.post(environment.apiUrl+'/users/api/users',formData).subscribe((e:any)=>{
      this.router.navigate(['/cms/user']);
      if(this.id){
        this.message.success('Cập nhật người dùng thành công')
      }else{
        this.message.success('Thêm mới người dùng thành công')
      }
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

  retrieveUser(){
    this.httpClient.get(environment.apiUrl+'/users/api/users/'+this.id).subscribe((e:any)=>{
        console.log('retrieve user: ',e);
        for(let key in e){
          if(key == 'avatar'){
            this.avatarPath = e[key];
          }
          // if(key == 'birthday'){
          //   this.addEditForm.get(key)?.setValue(formatDate(e[key],'dd/MM/yyyy','Asia/Ho_Chi_Minh'));
          // }else{
          //   this.addEditForm.get(key)?.setValue(e[key]);
          // }
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
      this.retrieveUser();
    }
  }
}
