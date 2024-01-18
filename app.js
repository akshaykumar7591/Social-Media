const express = require("express");
const app = express();
require("./Db/conn") // db is connect
require("dotenv").config();// for env file
const path = require("path")
const SingInRegister = require("./Models/register")
const Post = require("./Models/posts")
const bcrypt = require("bcryptjs")
const port = process.env.port || 3000;
const jwt = require("jsonwebtoken")
const multer = require("multer")
const cloudinary=require("cloudinary").v2

cloudinary.config({ 
  cloud_name: 'dewudfxyt', 
  api_key: '351585632696889', 
  api_secret: 'rdhQE3VM5E2omDuE2SGgBEZmtUs'
});

const cors = require('cors');
const { json } = require("body-parser");
app.use(cors());
app.use(express.json())

          




function verifyToken(req, res, next) {
    // console.log("inside verify")
    const token = req.headers['authorization'];
    // console.log(token)
    if (!token) return res.status(403).send('A token is required for authentication');
    try {

        req.user = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY); // Split to remove 'Bearer'
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).send('Invalid Token');
    }
}

// register
app.post("/singUp", async (req, res) => {
    try {
        console.log(req.body)
        const fname = await SingInRegister.findOne({ name: req.body.name });
        const femail = await SingInRegister.findOne({ email: req.body.email });
        if (fname) {
            res.status(201).send("username exist")
        }
        if (femail) {
            res.status(201).send("mail exist")

        }
        else {
            const user = new SingInRegister({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password


            })
            const token = await user.generateAuthToken();
            //    console.log(token)
            //  res.cookie("login",token);

            await user.save();
            //    req.session.token = token ;

            res.status(200).send("Register Successfully");
        }

    }
    catch (err) {
        console.log(err)

    }


})
// login
app.post("/singIn", async (req, res) => {
    // console.log(req.body);
    try {
        const uname = await SingInRegister.findOne({ name: req.body.name });
        // console.log(req.body.name)
        if (uname) {
            const isMatch = await bcrypt.compare(req.body.password, uname.password)
            if (isMatch) {
                const token = await uname.generateAuthToken();//also create a token for login page
                console.log(token);
                res.status(200).json({
                    success: "login sucess",
                    token: token,
                    id: uname.id,
                    username: uname.name
                })
            }
            else {
                res.status(201).send("password invalid")
            }

        }
        else {
            res.status(401).send("username invalid")
        }



    } catch (e) {
        res.status(500).send("Error during login");
    }



})



//add post
app.post("/addPost", async (req, res) => {
    try {
        // console.log(localStorage.getItem("base64"))
        // console.log(req.body.photo)
        let imgPath="C:/Users/aksha/Downloads/"+req.body.photo
        let photoPath;
        await cloudinary.uploader.upload(imgPath)
        .then(result=>{
         photoPath= result.url
        })
        .catch((e)=>console.log(e))
        
            
        
        const userpost = new Post({
            content: req.body.content,
            userId: req.body.userId,
            photo:photoPath
            
            
        })
        
        console.log(photoPath)


        // console.log(req.body.content)
        await userpost.save();

        res.status(200).send("done")

    }
    catch (e) {
        console.log(e)
        res.status(500).send("Error creating post")
    }
})

app.post("/addImage/:id",async(req,res)=>{
    try{
        console.log(req.body);
        let imgPath="C:/Users/aksha/OneDrive/Desktop/"+req.body.name;
        let photoPath;
        await cloudinary.uploader.upload(imgPath)
        .then(result=>{
         photoPath= result.url
        })
        .catch((e)=>console.log(e))

        let doc = await SingInRegister.findOneAndUpdate({_id:req.params.id}, {
          photo:photoPath  
        },{new:true})
        console.log(doc)
        await doc.save();
      res.status(200).json({image:doc.photo});
    }
    catch(e){
        console.log(e)
    }
})
app.get("/addImage/:id",async(req,res)=>{
    try{
      const user= await SingInRegister.findOne({_id:req.params.id})
      console.log(user.photo);
      if(user.photo==null){
        res.status(201)
      }
      res.status(200).json({img : user.photo})
    }catch(e){
        console.log(e)
        res.status(500)
    }
})
// get all posts
app.get('/getPosts/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const posts = await Post.find({userId:req.params.id});
        console.log(posts);
        res.json(posts);
    } catch (error) {
        res.status(500).send('Error fetching posts');
    }
});

// Fetch a single post
app.get('/posts/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.json(post);
    } catch (error) {
        res.status(500).send('Error fetching post');
    }
});

// Update a post
app.put('/posts/:postId', async (req, res) => {
    try {
        const post = await Post.findOne({
            _id: req.params.postId, userId:
                req.user.userId
        });
        if (!post) return res.status(404).send('Post not found or unauthorized');
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.status(200).send('Post updated successfully');
    } catch (error) {
        res.status(500).send('Error updating post');
    }
});


// Delete a post
app.delete('/posts/:postId', verifyToken, async (req, res) => {
    try {
        const result = await Post.findOneAndDelete({
            _id: req.params.postId, userId:
                req.user.userId
        });
        if (!result) {
            return res.status(404).send('Post not found or unauthorized');
        }
        res.status(200).send('Post deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting post');
    }
});

app.listen(port, () => {
    console.log(`server is start............. ${port}`)
})