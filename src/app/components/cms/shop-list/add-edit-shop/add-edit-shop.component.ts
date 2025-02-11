import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-add-edit-shop',
  standalone: false,
  
  templateUrl: './add-edit-shop.component.html',
  styleUrl: './add-edit-shop.component.scss'
})
export class AddEditShopComponent implements OnInit{

  constructor(private formBuilder:FormBuilder,private httpClient: HttpClient,
    private modal: NzModalService,private router:Router,
    private message: NzMessageService,protected activatedRoute: ActivatedRoute){
  
    this.activatedRoute.params.subscribe(params=>{
      if('id' in params){
        this.id = params['id'];
        this.isView = this.activatedRoute.snapshot.url[0].path === 'detail'
      }
    })    
    this.addEditForm = formBuilder.group({
      shopName: ['',Validators.required],
      description: [''],
      rating: [0],
      follower: [0],
      address: ['',Validators.required],
      status: ['']
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

  doCreateOrUpdate(){
    let param = this.setParam(this.addEditForm);
    const formData = new FormData();
    if(this.choosenFile){
      formData.append("file",this.choosenFile);
    }
    
    formData.append("data",JSON.stringify(param))

    this.httpClient.post(environment.apiUrl+'/shops/api/shops',formData).subscribe((e:any)=>{
      this.router.navigate(['/cms/shop']);
      if(this.id){
        this.message.success('Cập nhật gian hàng thành công')
      }else{
        this.message.success('Thêm mới gian hàng thành công')
      }
    })
  }

  back(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xác nhận',
      nzContent: 'Dữ liệu chưa được lưu lại, bạn có muốn hủy bỏ?',
      nzOnOk: () => {
        this.router.navigate(['/cms/shop'])
      }
    });
  }

  retrieveShop(){
    this.httpClient.get(environment.apiUrl+'/shops/api/shops/'+this.id).subscribe((e:any)=>{
        for(let key in e){
          if(key == 'avatar'){
            this.avatarPath = e[key];
          }
          this.addEditForm.get(key)?.setValue(e[key]);
        }
    })
  }

  doChangeFile(event:any){
    this.choosenFile = event;
  }

  ngOnInit(): void {
    if(this.id){
      this.retrieveShop();
    }
  }

}
