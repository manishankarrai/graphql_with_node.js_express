const express = require('express');
const { ApolloServer  } = require('apollo-server-express');
require('./db/connection');
const { resolvers } = require('./resolvers');
const {typeDefs } = require('./typeDefs');





async function startServer(){
   
    const app = express();
    const appoloServer = new ApolloServer({
        typeDefs ,
        resolvers,
    });
    await appoloServer.start();
    appoloServer.applyMiddleware({app : app , path: '/data'});
    app.use((req,res)=>{
        res.send("welcome from appolo server");
    });

 app.listen(3000 , ()=>{ console.log("server is listening on port 3000 ")});
}

startServer();

