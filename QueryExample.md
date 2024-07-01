**get query**
query {
   getAllPosts {
      id  , 
      title , 
      description
   }
}
**post query**

mutation {
    createPost (
       post: {
                title : "why earth is perfect for living things" , 
       description : "earth have perect combination of water , Co2 , oxyzon and carbon. so all living thing made of these elements."
       }
    ){
      id , title , description
    }
}
 


**update  query**
mutation {
    updatePost( id : "668265ce0acbd24a833c575b" , 
     post : {
        title : "pinkman is jessay pinkman" , 
        description : "it is a character of breaking bad series"
     } )  {
       title , 
       description 
     }
}


**delete query**

mutation {
   deletePost( id : "668265d80acbd24a833c575d")
}

