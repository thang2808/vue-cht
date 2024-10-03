// blog-search.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Blog } from '../../models/blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: ['./blog-search.component.css']
})
export class BlogSearchComponent implements OnInit {

  blogs$: Observable<Blog[]>;
  private searchedSubject = new Subject<string>();

  constructor(private blogService: BlogService) { }

  search(searchedString: string): void {    
    console.log(`searchedString = ${searchedString}`);
    this.searchedSubject.next(searchedString);
  }

  ngOnInit() {
    this.blogs$ = this.searchedSubject.pipe(
      debounceTime(300), // wait 300ms after each keystroke before considering the searched string
      distinctUntilChanged(),// ignore new string if same as previous string
      switchMap((searchedString: string) => this.blogService.searchBlogs(searchedString))
    );
  }
  delete(blogId: number):void {
    this.blogService.deleteBlog(blogId).subscribe(() => {
      this.blogs$ = this.blogs$.filter(blog => blog.id !== blogId)
    });
  }
}
