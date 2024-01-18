const mongoose=require("mongoose")
const validate=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
require("dotenv").config();

const register=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
        lowercase:true

    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate(value){
            if(!validate.isEmail(value)){
                throw new Error("email is not valid")
            }
        }
    },
    password:{
        type:String,
        require:true,
        minlength:[5,"length is smaller than 5"]

    },
    photo:{
        type:String,
        default:null
    },
    follow:{
        type:Array,
        default:["65a567668fd76e3f7c671bc4","65a5865ce7e8e24918e1ee64"]
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

// console.log(process.env.SECRET_KEY);
// generating tokens
register.methods.generateAuthToken=async function(){
    try{
        const token=jwt.sign({
            _id:this._id,
            name:this.name,


        },process.env.SECRET_KEY,{
            expiresIn:"2h"
        });
        this.tokens=this.tokens.concat({token:token});
        // console.log(jwt.verify(token,process.env.SECRET_KEY))
        await this.save();
        return token;

    }catch(err){
         
        console.log(err);
    }
}

// converting password int hash
register.pre("save", async function(next){
    // console.log();
    if(this.isModified("password")){
      this.password=await  bcrypt.hash(this.password,10);
    }
    next();

})
const SingInRegister = new mongoose.model("SingInRegister", register);

module.exports=SingInRegister;