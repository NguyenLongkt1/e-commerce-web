import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsComponent } from './cms.component';
import { CmsRoutingModule } from '../../routing/cms-routing.module';
import { ShopListComponent } from './shop-list/shop-list.component';



@NgModule({
  declarations: [
    CmsComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule
  ]
})
export class CmsModule { }
