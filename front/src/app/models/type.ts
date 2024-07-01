export interface Post {
    id ?: string;
    title: string;
    description: string;
  }
  
  export interface GetAllPostsResponse {
    getAllPosts: Post[];
  }
  export interface CreatePostResponse {
    createPost: {
      id: string;
      title: string;
      description: string;
    };
  }
  