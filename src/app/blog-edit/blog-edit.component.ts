import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Blog } from '../../models/blog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogService } from '../blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  blogForm: FormGroup;

  @ViewChild('fileInput') fileInput: ElementRef; // Tham chiếu đến input file
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private location: Location,
    private fb: FormBuilder
  ) { 
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      des: ['', Validators.required],
      detail: ['', Validators.required],
      category: [''],
      public: [''],
      data_pubblic: [''],
      position: [''],
      thumbs: ['']
    });
  }

  ngOnInit() {
    this.getBlogFromRouter();
  }

  getBlogFromRouter(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    this.blogService.getBlogFromId(id).subscribe(blog => 
      {
        this.blog = { ...blog};
        this.originalBlog = { ...blog};
        this.blogForm.patchValue(this.blog); 
      });
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
    // Kiểm tra các trường bắt buộc
    if (this.blogForm.invalid) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }

      // Tạo đối tượng blog mới từ form
    const updatedBlog: Blog = {
      ...this.blog,
      ...this.blogForm.value,
      thumbs: this.blog.thumbs // Nếu bạn muốn giữ nguyên hình ảnh đã tải lên
    };

      // Gọi phương thức updateBlog
    this.blogService.updateBlog(updatedBlog).subscribe(
      () => {
        this.goBack();
      },
      error => {
        console.error('Lỗi cập nhật blog:', error);
        alert('Cập nhật blog không thành công!');
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  clearForm(): void {
    // Khôi phục lại trạng thái ban đầu của blog
    this.blog = { ...this.originalBlog };

    // Xóa tệp đã chọn
    this.selectedFile = null;

    // Đặt lại phần tử input file
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
