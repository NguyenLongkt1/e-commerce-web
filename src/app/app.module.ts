import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideNzI18n } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { authInterceptor } from './interceptors/auth-interceptors';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TopNavigationComponent } from './components/landing/top-navigation/top-navigation.component';
import { HomePageComponent } from './components/landing/home-page/home-page.component';
import { LoginComponent } from './components/landing/dialog-component/login/login.component';
import { UserListComponent } from './components/cms/user-list/user-list.component';
import { AddEditUserComponent } from './components/cms/user-list/add-edit-user/add-edit-user.component';
import { CmsComponent } from './components/cms/cms.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LandingComponent } from './components/landing/landing.component';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UploadImageComponent } from './components/common/upload-image/upload-image.component';




registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TopNavigationComponent,
    HomePageComponent,
    LoginComponent,
    UserListComponent,
    AddEditUserComponent,
    CmsComponent,
    LandingComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzCarouselModule,
    NzDividerModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzMenuModule,
    NzSelectModule,
    NzDatePickerModule,
    NzUploadModule
  ],
  exports: [
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzCarouselModule,
    NzDividerModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzSelectModule,
    NzUploadModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
