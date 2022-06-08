const jwt = require('jsonwebtoken')
const { userSchema } = require('../model/users')

function check(req,res,next){
    // return console.log(jwt);
    if(req.headers.authorization){
        if(req.headers.authorization.split(" ")[0]=="Bearer"){
            const token = req.headers.authorization.split(" ")[1]
            jwt.verify(token, process.env.jwtkey, (err,payload)=>{
                if (err) {
                    console.log(err);
                } else {
                    userSchema.findOne({username: payload.username},'username', (err, user)=>{
                            if(!user){
                        res.send('user doesnt exist')
                    }
                    else{
                        
                    console.log(payload);
                    next()
                    }
                    })
                    
                }
            }) 
        }
        
    }
    else{
        res.send('not authorized')
    }
}

module.exports = {check}

