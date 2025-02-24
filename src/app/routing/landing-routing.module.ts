import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingComponent } from "../components/landing/landing.component";
import { HomePageComponent } from "../components/landing/home-page/home-page.component";
import { ProductDetailComponent } from "../components/landing/product-detail/product-detail.component";

const routes: Routes = [
    {
      path: 'landing',
      component: LandingComponent,
      children: [
        {
          path: '',
          component: HomePageComponent
        },
        {
          path: 'home',
          component: HomePageComponent
        },
        {
          path: 'product-detail/:id',
          component: ProductDetailComponent,
          pathMatch: 'full'
        }
      ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
