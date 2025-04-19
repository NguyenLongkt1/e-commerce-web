import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingComponent } from "../components/landing/landing.component";
import { HomePageComponent } from "../components/landing/home-page/home-page.component";
import { ProductDetailComponent } from "../components/landing/product-detail/product-detail.component";
import { CartComponent } from "../components/landing/cart/cart.component";

const routes: Routes = [
    {
      path: 'landing',
      component: LandingComponent,
      children: [
        {
          path: 'product-detail/:id',
          component: ProductDetailComponent,
          pathMatch: 'full'
        },
        {
          path: 'cart',
          component: CartComponent,
          pathMatch: 'full'
        },
        {
          path: '',
          component: HomePageComponent,
          pathMatch: 'full'
        },
      ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
