import { Injectable } from '@angular/core';

// post.service.ts
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/type'; 



@Injectable({
  providedIn: 'root'
})


export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getAllPosts(): Observable<Post[]> {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          getAllPosts {
            id
            title
            description
          }
        }
      `
    }).valueChanges.pipe(
      map(result => result.data.getAllPosts)
    );
  }

  createPost(title: string, description: string): Observable<any> {
    const CREATE_POST = gql`
      mutation CreatePost($title: String!, $description: String!) {
        createPost(post: { title: $title, description: $description }) {
          id
          title
          description
        }
      }
    `;

    return this.apollo.mutate({
      mutation: CREATE_POST,
      variables: {
        title,
        description
      },
      refetchQueries: [
        { query: gql`{ getAllPosts { id, title, description } }` }
      ]
    });
  }
  getPostById(id: string): Observable<Post> {
    const GET_POST_BY_ID = gql`
      query GetPost($id: ID!) {
        getPost(id: $id) {
          id
          title
          description
        }
      }
    `;

    return this.apollo
      .watchQuery<{ getPost: Post }>({
        query: GET_POST_BY_ID,
        variables: {
          id
        }
      })
      .valueChanges.pipe(
        map(result => result.data.getPost)
      );
  }

  updatePost(id: string, title: string, description: string): Observable<any> {
    const UPDATE_POST = gql`
      mutation UpdatePost($id: ID!, $title: String!, $description: String!) {
        updatePost(id: $id, post: { title: $title, description: $description }) {
          id
          title
          description
        }
      }
    `;

    return this.apollo.mutate({
      mutation: UPDATE_POST,
      variables: {
        id,
        title,
        description
      },
      refetchQueries: [
        { query: gql`{ getAllPosts { id, title, description } }` }
      ]
    });
  }

  deletePost(id: string): Observable<any> {
    const DELETE_POST = gql`
      mutation DeletePost($id: ID!) {
        deletePost(id: $id)
      }
    `;

    return this.apollo.mutate({
      mutation: DELETE_POST,
      variables: {
        id
      },
      refetchQueries: [
        { query: gql`{ getAllPosts { id, title, description } }` }
      ]
    });
  }
}
