import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/post';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  postsForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  fetchedPosts: Post[] = [];
  isFetching = false;

  constructor(private PostService: PostService) {}

  ngOnInit(): void {}

  onSubmit() {
    const formValue: Post = this.postsForm.value;

    if (formValue.title && formValue.content)
      this.PostService.createNewPost(formValue);
  }

  onFetch() {
    this.isFetching = true;

    this.PostService.fetchPosts().subscribe((posts) => {
      this.fetchedPosts = posts;
      this.isFetching = false;
    });
  }
}
