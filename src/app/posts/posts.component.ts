import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PostsService } from '../posts.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { post } from '../post.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [HeaderComponent, MatPaginatorModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {

  //services
  postsService: PostsService = inject(PostsService);
  router:Router=inject(Router);
  //pagination properties
  paginatorLength: number;
  paginatorPageSizeOptions: number[] = [1, 2, 3, 4, 5, 10];
  postsPerPage: number = 10;
  currentPage = 1;

  //posts
  posts: post[];
  SlicedPosts:post[];


  ngOnInit() {
    this.postsService.getPosts().subscribe({
      next: (value: post[]) => {
        this.paginatorLength = value.length;
        this.posts = value;
        this.SlicedPosts=this.postsService.slicePosts(value, this.postsPerPage,)
      },
      error:(error)=>{
        console.log(error)
      }
    })

  }

  onChangedPage(event: PageEvent) {
   this.SlicedPosts=this.postsService.slicePosts(this.posts,event.pageSize,event.pageIndex)
  }
  postClicked(id:number){
   this.postsService.saveClickedPostId(id)
    this.router.navigate(['/post-details']);
  }
}
