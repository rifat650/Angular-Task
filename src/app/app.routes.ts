import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';

export const routes: Routes = [
   { path: '', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
   { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
   { path: 'signup', loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent) },
   { path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },
   { path: 'posts', loadComponent: () => import('./posts/posts.component').then(c => c.PostsComponent) },
   { path: 'post-details', loadComponent: () => import('./post-details/post-details.component').then(c => c.PostDetailsComponent) }
];
