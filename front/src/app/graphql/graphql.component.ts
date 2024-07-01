import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../services/graphql.service'; 
import { Post } from '../models/type'; 

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.scss']
})
export class GraphqlComponent implements OnInit {
  posts: Post[] = [];
  title: string = '';
  description: string = '';
  title_: string = '';
  id_: string = '';
  description_: string = '';
  editBoolean = false;

  constructor(private postService: GraphqlService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  addData(): void {
    this.postService.createPost(this.title, this.description).subscribe(() => {
      console.log('Post created successfully');
      this.getData(); 
      this.title = ''; 
      this.description = '';
    },  (error : any) =>  {
      console.error('Error creating post:', error);
    });
  }

  editPost(id: any): void {
    this.postService.getPostById(id).subscribe((post: any  ) => {
      this.id_ = post.id;
      this.title_ = post.title;
      this.description_ = post.description;
      this.editBoolean = true;
    }, (error : any) => {
      console.error('Error fetching post by ID:', error);
    });
  }

  updatePost(): void {
    this.postService.updatePost(this.id_, this.title_, this.description_).subscribe(() => {
      console.log('Post updated successfully');
      this.getData(); 
      this.id_ = '';
      this.title_ = '';
      this.description_ = '';
      this.editBoolean = false;
    },  (error : any) =>  {
      console.error('Error updating post:', error);
    });
  }

  deletePost(id: any): void {
    this.postService.deletePost(id).subscribe(() => {
      console.log('Post deleted successfully');
      this.getData(); 
    },  (error : any) =>  {
      console.error('Error deleting post:', error);
    });
  }
}
