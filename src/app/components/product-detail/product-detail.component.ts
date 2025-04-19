import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  product: Product | null = null;
  quantity: number = 1;
  showToggle: boolean = false;
  private resizeObserver: ResizeObserver | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (product) => {
          this.product = product;
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }

  ngAfterViewInit() {
    // Khởi tạo ResizeObserver
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        this.showToggle = height < 300;
      }
    });

    // Bắt đầu quan sát body
    this.resizeObserver.observe(document.body);

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
    const height = window.innerHeight;
    this.showToggle = height < 300;
  }

  // ... existing code ...
} 