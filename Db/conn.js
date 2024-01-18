const mongoose=require("mongoose")
 
mongoose.connect("mongodb://127.0.0.1:27017/SocialMedia")
.then(()=>{
    console.log("db is connect")
})
.catch(
    (err)=>{console.log(err)
});