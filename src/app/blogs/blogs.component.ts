import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
 
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) { }

  getBlogsFromServices(): void {
    this.blogService.getBlogs().subscribe(updatedBlogs => this.blogs = updatedBlogs);
      console.log(`this.blog = ${JSON.stringify(this.blogs)}`);
  }


  ngOnInit() {
    this.getBlogsFromServices();
  }

  delete(blogId: number):void {
    this.blogService.deleteBlog(blogId).subscribe(_ => {
      this.blogs = this.blogs.filter(eachBlog => eachBlog.id !== blogId)
    });
  }

}
