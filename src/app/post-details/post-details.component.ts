import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PostsService } from '../posts.service';
import { post } from '../post.model';
import { comment } from '../comment.model';
import { AuthenticationService } from '../authentication.service';
import { signUpValue } from '../signupValue.model';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [HeaderComponent, DialogModule, MatDialogModule, MatButtonModule,RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  postsService: PostsService = inject(PostsService);
  authenticationService: AuthenticationService = inject(AuthenticationService);
  clickedPost: post;
  postComments: comment[];
  showAuthPopUp=false;

  ngOnInit() {
    let postId = this.postsService.getClickedPostId();
    this.postsService.getPostsById(postId).subscribe({
      next: (value: post) => {
        this.clickedPost = value;
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.postsService.getCommentsById(postId).subscribe({
      next: (value: comment[]) => {
        this.postComments = value;
      },
      error: (error) => {
        console.log(error)
      }
    });

  }

  onCommentPost(commentInputField: HTMLTextAreaElement) {
    let userInfo: signUpValue = this.authenticationService.getSignupValue()
    let commentObj = {
      postId: this.clickedPost.id,
      id: this.postComments[this.postComments.length - 1].id + 1,
      name: userInfo.username,
      email: userInfo.email,
      body: commentInputField.value
    }
    let isLoggedIn = this.authenticationService.UserLoggedIn();

    if (isLoggedIn) {
      this.postComments.push(commentObj);
      commentInputField.value=null;
    } else {
this.showAuthPopUp=true;
    }
  }
  ngOnDestroy() {
    this.postsService.deleteClickedPostId()
  }

  hideAuthPopUp(){
    this.showAuthPopUp=false;
  }
}
