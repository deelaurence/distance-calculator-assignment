const{ userSchema }= require('../model/users')
const bcrypt = require('bcrypt')
// const { route } = require('../routes')
const jwt = require('jsonwebtoken')
function register(req,res) {
    const {username, email, password}=req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const newUser = new userSchema({
        username,email,password:hashedPassword, role:'user'
    })
    newUser.save((err)=>{
if(err)console.log(err);
res.send("user created sucessfully")
    })
}


async function login(req, res) {
    const {username, password} = req.body
    const user = await userSchema.findOne({username},'username password')
    const passwordMatch = bcrypt.compareSync(password, user.password)
if(!passwordMatch) res.send("incorrect details")
    
   else{
        jwt.sign({username:user.username , role:user.role}, process.env.jwtkey,(err,token)=>{
            res.send(token)    
        })
        }    
   
}



module.exports={register,login}