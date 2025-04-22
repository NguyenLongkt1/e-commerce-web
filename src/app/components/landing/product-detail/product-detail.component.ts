import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubjectCartService } from '../../../subject-services/behavior-subject-cart.service';
import { LandingBaseComponent } from '../../../base/landing-base';
import { BehaviorSubjectModalService } from '../../../subject-services/behavior-subject-modal.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent extends LandingBaseComponent implements OnInit, OnDestroy, AfterViewInit{

  constructor(private activatedRoute: ActivatedRoute, private httpClient:HttpClient,
        private formBuilder:FormBuilder,private behaviorSubjectCartService:BehaviorSubjectCartService,
        private behaviorSubjectModalService:BehaviorSubjectModalService){
    super();
    this.activatedRoute.params.subscribe(params=>{
      if('id' in params){
        this.id = params['id'];
      }
    });
    this.formRating = this.formBuilder.group({

    });  
  }

  @ViewChild('contentElement') contentElement!: ElementRef;
  showToggle: boolean = false;
  private resizeObserver: ResizeObserver | null = null;
  productDetail:any;
  choosenImg:any;
  id:any;
  lstFile:any = [];
  formRating:FormGroup;
  buyValue = 1;
  textContent:any="Xem thêm";

  async getProductDetail(){
    this.httpClient.get(environment.apiUrl+'/products/command/products/'+this.id).subscribe((e:any)=>{
      this.productDetail = e;
      console.log('productDetail: ',this.productDetail)
    })
  }

  addToCart(productDetail:any){
    super.checkLoginBeforeChangeRoute(
      ()=>this.behaviorSubjectModalService.openModal(),
      ()=>{
        this.behaviorSubjectCartService.addItem(productDetail.id)
        this.behaviorSubjectCartService.addFakeItem(productDetail)
      }
    )
  }

  setBuyValue(value:any){
    this.buyValue = value;
  }
  expandData(){
    let container = document.querySelector(".content");
    console.log('test expand: ',container)
    if(container != null){
      container.classList.toggle("expanded");
      this.textContent = container.classList.contains("expanded") ? "Thu gọn" : "Xem thêm";
    }
  }

  ngAfterViewInit() {
    // Khởi tạo ResizeObserver
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        this.showToggle = height >= 300;
      }
    });
    this.resizeObserver.observe(this.contentElement.nativeElement);
    // Kiểm tra kích thước ban đầu
    this.checkViewportHeight();
  }

  ngOnDestroy() {
    // Dọn dẹp ResizeObserver khi component bị hủy
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private checkViewportHeight() {
    const height = this.contentElement.nativeElement.offsetHeight;
    this.showToggle = height >= 300;
  }

  ngOnInit(): void {
    this.choosenImg = '/img/test.png'
    this.lstFile = [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6},{id: 7}];
    this.getProductDetail();
  }

}
