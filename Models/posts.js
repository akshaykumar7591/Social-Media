const mongoose=require("mongoose")

const userPosts= new mongoose.Schema({
    title:{
        type:String

    },
    content:{
        type:String
    },
    userId:{
        type:String,
        required:true
    },
    photo:{
        type:String
    },
    time:{
      type:String,
      default:new Date().toLocaleTimeString()
    },
    date:{
        type:String,
        default:new Date().toLocaleDateString()
    }

})


const Post= new mongoose.model("Post",userPosts);

module.exports=Post;