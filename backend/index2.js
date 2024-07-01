// monolithic code 
// dependency upon no other component 
//run by calling:  node index2.js
const { ApolloServer , gql  } =  require('apollo-server');

const typeDefs =  gql`
    type Query {
       greeting: String  , 
       message : String  ,
    }
`;
const resolvers = {
    Query : {
         greeting: ()=> {
            return 'Hello  , GraphQL work ';
         } , 
         message: ()=> {
             return 'Hey there  ...' ;
         }
    }
}

const server  = new ApolloServer({
    typeDefs , 
    resolvers 
});

server.listen(9000 , ()=> console.log("server is running on port 3000"))
