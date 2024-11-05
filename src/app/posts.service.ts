import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }
  http:HttpClient=inject(HttpClient);



getPosts(){
  return this.http.get<post[]>('https://jsonplaceholder.typicode.com/posts');
}
getComments(){
  this.http.get('https://jsonplaceholder.typicode.com/comments')
}
slicePosts(value:post[],pageSize:number, pageIndex:number=0):post[]{

  const startIndex=pageIndex*pageSize;
  const endingIndex=startIndex+pageSize;
  return value.slice(startIndex,endingIndex)
}
}
