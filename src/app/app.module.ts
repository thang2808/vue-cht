import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { BlogService } from './blog.service';
import { HttpClientModule } from '@angular/common/http';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogSearchComponent } from './blog-search/blog-search.component';
import { ReactiveFormsModule } from '@angular/forms';
// Import NG-ZORRO modules
import { NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd'; // Chỉ cần import NZ_I18N
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppMenuComponent,
    BlogsComponent,
    BlogDetailComponent,
    BlogEditComponent,
    BlogAddComponent,
    BlogSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
