var express = require('express');
var router = express.Router();
const{register,login}=require('../controller/auth')
const {check} = require('../auth-middleware/checkifloggedin')
/* GET home page. */
router.post('/',register);
router.post('/login',login);
router.get('/general', (req,res)=>{
res.send('anyone can access this route')
})

router.get('/restricted', check, (req,res)=>{
    
res.send('you have just acessed an authorized route')
})


module.exports = router;
