import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "../components/cms/user-list/user-list.component";
import { AddEditUserComponent } from "../components/cms/user-list/add-edit-user/add-edit-user.component";
import { CmsComponent } from "../components/cms/cms.component";
import { CategoryListComponent } from "../components/cms/category-list/category-list.component";
import { AddEditCategoryComponent } from "../components/cms/category-list/add-edit-category/add-edit-category.component";
import { AddEditShopComponent } from "../components/cms/shop-list/add-edit-shop/add-edit-shop.component";
import { ShopListComponent } from "../components/cms/shop-list/shop-list.component";

const routes: Routes = [
    {
      path: 'cms',
      component: CmsComponent,
      children: [
        {
          path: 'user',
          children: [
            {
              path: 'detail/:id',
              pathMatch: 'full',
              component: AddEditUserComponent
            },
            {
                path: 'edit/:id',
                pathMatch: 'full',
                component: AddEditUserComponent
            },
            {
                path: 'add',
                component: AddEditUserComponent
            },
            {
                path: '',
                component: UserListComponent
            }
          ]
        },
        {
          path: 'category',
          children: [
            {
              path: 'detail/:id',
              pathMatch: 'full',
              component: AddEditCategoryComponent
            },
            {
                path: 'edit/:id',
                pathMatch: 'full',
                component: AddEditCategoryComponent
            },
            {
                path: 'add',
                component: AddEditCategoryComponent
            },
            {
                path: '',
                component: CategoryListComponent
            }
          ]
        },
        {
          path: 'shop',
          children: [
            {
              path: 'detail/:id',
              pathMatch: 'full',
              component: AddEditShopComponent
            },
            {
                path: 'edit/:id',
                pathMatch: 'full',
                component: AddEditShopComponent
            },
            {
                path: 'add',
                component: AddEditShopComponent
            },
            {
                path: '',
                component: ShopListComponent
            }
          ]
        },
        
      ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
