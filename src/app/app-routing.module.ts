import { NgModule } from '@angular/core';
//IMPORT cac router
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { Blog } from '../models/blog';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogSearchComponent } from './blog-search/blog-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full'},
  { path: 'blogs', component: BlogsComponent},
  { path: 'detail/:id', component: BlogDetailComponent},
  { path: 'edit/:id', component: BlogEditComponent},
  { path: 'add', component: BlogAddComponent},
  { path: 'search', component: BlogSearchComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
