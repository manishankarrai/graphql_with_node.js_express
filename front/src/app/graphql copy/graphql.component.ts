import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CreatePostResponse, GetAllPostsResponse, Post } from '../models/type'; // Adjust the path as necessary

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
  editBoolean =  false ;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getData(); 
  }

  getData(): void {
    this.apollo.watchQuery<GetAllPostsResponse>({
      query: gql`
        {
          getAllPosts {
            id
            title
            description
          }
        }
      `
    }).valueChanges.subscribe(({ data }) => {
      console.log("call get");
      this.posts = data.getAllPosts;
    });
  }

  addData(): void {
    const CREATE_POST = gql`
      mutation createPost($title: String!, $description: String!) {
        createPost(post: { title: $title, description: $description }) {
          id
          title
          description
        }
      }
    `;

    this.apollo
      .mutate<CreatePostResponse>({
        mutation: CREATE_POST,
        variables: {
          title: this.title,
          description: this.description
        }
      })
      .subscribe(
        ({ data }) => {
          console.log('Created post:', data);
          this.getData(); // Refresh the list of posts after creating a new one
          this.title = ''; // Clear input fields
          this.description = '';
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
  }

  // Method to fetch a single post by its ID
  getPostById(id: string | undefined): void {
    const GET_POST_BY_ID = gql`
      query getPost($id: ID!) {
        getPost(id: $id) {
          id
          title
          description
        }
      }
    `;

    this.apollo
      .watchQuery({
        query: GET_POST_BY_ID,
        variables: { id }
      })
      .valueChanges.subscribe(({ data  }) => {
        console.log('Fetched post by ID:', data);
        
        
      }, error => {
        console.error('Error fetching post by ID:', error);
      });
  }

  // Method to update an existing post
  updatePost(): void {
    const id  = this.id_ ;
    const title  = this.title_ ;
    const description  = this.description_ ;

    const UPDATE_POST = gql`
      mutation updatePost($id: ID!, $title: String!, $description: String!) {
        updatePost(id: $id, post: { title: $title, description: $description }) {
          id
          title
          description
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: UPDATE_POST,
        variables: {
          id,
          title,
          description
        }
      })
      .subscribe(
        ({ data }) => {
          console.log('Updated post:', data);
          this.id_ = '' ;
          this.title_ =  '' ;
          this.description_ =  '' ;
          this.editBoolean =  false ;
          this.getData(); 
        },
        (error) => {
          console.error('Error updating post:', error);
        }
      );
  }

  
  editPost(id: string | undefined): void {
    const GET_POST_BY_ID = gql`
      query getPost($id: ID!) {
        getPost(id: $id) {
          id
          title
          description
        }
      }
    `;
    let editData : any  = '';

    this.apollo
      .watchQuery({
        query: GET_POST_BY_ID,
        variables: { id }
      })
      .valueChanges.subscribe(({ data }) => {
        console.log('Fetched post by ID:', data);
        editData =  data ;
        this.id_ = editData.getPost.id ;
        this.title_ = editData.getPost.title ;
        this.description_ = editData.getPost.description ;
        this.editBoolean =  true ;
        
      }, error => {
        console.error('Error fetching post by ID:', error);
      });

  }

  // Method to delete a post by its ID
  deletePost(id: string | undefined): void {
    const DELETE_POST = gql`
      mutation deletePost($id: ID!) {
        deletePost(id: $id)
      }
    `;

    this.apollo
      .mutate({
        mutation: DELETE_POST,
        variables: {
          id
        }
      })
      .subscribe(
        ({ data }) => {
          console.log('Deleted post:', data);
          this.getData(); 
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      );
  }
}
