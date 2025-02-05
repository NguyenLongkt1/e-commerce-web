import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsRoutingModule } from './routing/cms-routing.module';
import { LandingModule } from './components/landing/landing.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./routing/landing-routing.module').then(m => m.LandingRoutingModule)
  },
  {
    path: 'landing',
    pathMatch: 'full',
    loadChildren: () => import('./routing/landing-routing.module').then(m => m.LandingRoutingModule)
  },
  {
    path: 'cms',
    pathMatch: 'full',
    loadChildren: () => import('./routing/cms-routing.module').then(m => m.CmsRoutingModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CmsRoutingModule,
    LandingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
