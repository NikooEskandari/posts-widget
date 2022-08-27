import { Injectable } from '@angular/core';
import { Post } from './post';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createNewPost(post: Post) {
    console.log(post);
    return this.http
      .post(
        'https://angular-1-4b59e-default-rtdb.firebaseio.com/posts.json',
        post
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-1-4b59e-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];

          for (const key in responseData) {
            postsArray.push({ ...responseData[key], id: key });
          }

          console.log(postsArray);
          return postsArray;
        })
      );
  }

  editPosts() {}
}
