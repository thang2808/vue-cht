import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';

//GET data asynchronously with Observable
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BlogService {

  private blogsURL ='http://localhost:3100/blogs';
  //USE mockApi
  // private blogsURL='https://66fe42532b9aac9c997b08f5.mockapi.io/blogs';

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsURL).pipe(
      tap(receivedBlogs => console.log(`receivedBlogs = ${JSON.stringify(receivedBlogs)}`)),
      catchError(error => of([]))
    );
  }
  
  getBlogFromId(id: number): Observable<Blog> {
    const url = `${this.blogsURL}/${id}`;
    return this.http.get<Blog>(url).pipe(
      tap(selectedBlog => console.log(`selected blog = ${JSON.stringify(selectedBlog)}`)),
      catchError(error => of(new Blog()))
    );
  }

  //PUT: update the blog on the server
  updateBlog(blog: Blog): Observable<any> {
    return this.http.put(`${this.blogsURL}/${blog.id}`, blog, httpOptions).pipe(
      tap(updatedBlog => console.log(`updated movie = ${JSON.stringify(updatedBlog)}`)),
      catchError(error => of(new Blog()))
    );
  }

  //POST: add a new blog to the serve
  addBlog(newBlog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.blogsURL, newBlog, httpOptions).pipe(
      tap((blog: Blog) => console.log(`inserted blog = ${JSON.stringify(blog)}`)),
      catchError(error => of(new Blog()))
    );
  }

  //DELETE: delete the blog from the serve
  deleteBlog(blogId: number): Observable<Blog> {
    const url = `${this.blogsURL}/${blogId}`;
    return this.http.delete<Blog>(url, httpOptions).pipe(
      tap(_ => console.log(`Deleted blog with id = ${blogId}`)),
      catchError(error => of(null))
    );
  }

  /* GET blogs whose title contains searched string */
  //mock thi dung title=... con json thi dung title_like=...
  searchBlogs(typedString: string): Observable<Blog[]> {
    if (!typedString.trim()) {     
      return of([]);
    }
    return this.http.get<Blog[]>(`${this.blogsURL}?title_like=${typedString}`).pipe(
      tap(foundedBlogs => console.log(`founded blogs = ${JSON.stringify(foundedBlogs)}`)),
      catchError(error => of(null))
    );
  }
  constructor(
    private http: HttpClient
  ) { }

}