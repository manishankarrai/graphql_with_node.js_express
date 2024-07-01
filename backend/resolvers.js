const { Post } = require('./Models/Post.model');

const resolvers = {
    Query: {
        getName: ()=> {
            return "hello , my name is rajan" 
        },
        getAllPosts: async ()=>{
            return await Post.find() ;
        },
        getPost: async (parent , { id} ,context,info)=>{
            return await Post.findById(id)
        }
        
    } ,
    Mutation: {
       createPost: async(parent ,args ,context , info)=>{
          const { title , description } = args.post ;
        const  post = new Post({title ,description });
        return await post.save() ; 

       },
       deletePost: async(parent , { id } ,context,info)=>{
        await Post.findByIdAndDelete(id);
        return "ok  ,item deleted "
       } ,
       updatePost: async(parent , args , context , info)=>{
        const { id } = args ;
        const { title , description  } = args.post ;
         const post = await Post.findByIdAndUpdate(id , {title , description} ,{ new : true}) ;
         return post 
       }

    }
}


module.exports = { resolvers };