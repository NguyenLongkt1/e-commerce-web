import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "../components/cms/user-list/user-list.component";
import { AddEditUserComponent } from "../components/cms/user-list/add-edit-user/add-edit-user.component";
import { CmsComponent } from "../components/cms/cms.component";

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
        }
      ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
