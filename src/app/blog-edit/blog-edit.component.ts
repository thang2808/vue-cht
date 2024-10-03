import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../models/blog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  @Input() blog: Blog;
  selectedFile: File = null;
  // Luu tru trang thai ban dau
  originalBlog: Blog;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getBlogFromRouter();
  }

  getBlogFromRouter(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    this.blogService.getBlogFromId(id).subscribe(blog => this.blog = blog);
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.blog.thumbs = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  save(): void {
    this.blogService.updateBlog(this.blog).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  clearForm(): void {
    this.blog = { ...this.originalBlog }; 
  }
}
