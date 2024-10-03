import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { BlogService } from '../blog.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {
  blog: Blog = new Blog();
  blogs: Blog[] = [];
  selectedFile: File = null;

  constructor(
    private blogService: BlogService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.getBlogsFromServices();
  }
  
  getBlogsFromServices(): void {
    // this.blogs = this.blogService.getBlogs();
    this.blogService.getBlogs().subscribe(updatedBlogs => this.blogs = updatedBlogs);
      console.log(`this.blog = ${JSON.stringify(this.blogs)}`);
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.blog.thumbs = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  addBlog(): void {
    // Kiểm tra các trường bắt buộc
    if (!this.blog.title || !this.blog.des || !this.blog.detail) {
      console.error('Missing required fields');
      alert('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }

    const newBlog: Blog = {
      ...this.blog,
      
    };

    this.blogService.addBlog(newBlog)
      .subscribe(insertedBlog => {
        this.blogs.push(insertedBlog);
        console.log(`Blog added: ${JSON.stringify(insertedBlog)}`);
        this.clearForm();
        // Chuyển hướng đến danh sách blog sau khi thêm thành công
        this.router.navigate(['/blogs']);
      }, error => {
        console.error('Error adding blog:', error);
        alert('Có lỗi xảy ra khi thêm blog. Vui lòng thử lại.');
      });
  }
  clearForm(): void {
    this.blog = new Blog(); 
    this.selectedFile = null;
  }
}
