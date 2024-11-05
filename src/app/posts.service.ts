import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { post } from './post.model';
import { comment } from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }
  http: HttpClient = inject(HttpClient);

  getPosts() {
    return this.http.get<post[]>('https://jsonplaceholder.typicode.com/posts');
  }
  getCommentsById(postId: number) {
    return this.http.get<comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  }
  slicePosts(value: post[], pageSize: number, pageIndex: number = 0): post[] {
    const startIndex = pageIndex * pageSize;
    const endingIndex = startIndex + pageSize;
    return value.slice(startIndex, endingIndex)
  }
  getPostsById(id: number) {
    return this.http.get<post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  saveClickedPostId(id: number) {
    localStorage.setItem('clickedPostId', id.toString())
  }

  getClickedPostId() {
    return JSON.parse(localStorage.getItem('clickedPostId'))
  }
  deleteClickedPostId() {
    localStorage.removeItem('clickedPostId');
  }



  // postComment(comment:comment){
  //   this.http.post('https://jsonplaceholder.typicode.com/comments',comment).subscribe({
  //     next:(value)=>{
  //       console.log(value)
  //     }
  //   })
  // }

}
