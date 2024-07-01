const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: String
    title: String
    description: String
  }
  input PostInput {
    title: String
    description: String
  }
  type Query {
    getName: String
    getAllPosts: [Post]
    getPost(id: ID): Post
  }
  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
  }
`;

module.exports = { typeDefs };
