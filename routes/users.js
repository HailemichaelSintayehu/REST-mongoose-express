var express = require('express');

const bodyParser = require('body-parser');

var User = require('../models/user');

var passport = require('passport');

const authenticate  = require('../authenticate');

var cors = require('./cors')

var router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');

});

router.post('/signup',cors.corsOptions,(req,res,next)=>{

    User.register(new User({username:req.body.username}),
    
      req.body.password ,(err,user) =>{

        if(err){

          res.statusCode = 500;

          res.setHeader('Content-Type','application/json');

          res.json({err:err})
        }
        else{
          if(req.body.firstname)

            user.firstname = req.body.firstname;

          if(req.body.lastname)
          
            user.lastname = req.body.lastname;

          user.save((err,user) =>{
            
            if(err){
              res.statusCode = 500;

              res.setHeader('Content-Type','application/json');
    
              res.json({err:err})

              return;
            }
            passport.authenticate('local')(req,res,() =>{

              res.statusCode = 200;
  
              res.setHeader('Content-Type','application/json');
        
              res.json({
                  status:'Registration Successfull',
                  success:true
              });
          });
        })
      }
  });
});
 
router.post('/login',cors.corsOptions,passport.authenticate('local'),(req,res,next)=>{

  var token = authenticate.getToken({_id:req.user._id});

  res.statusCode = 200;

  res.setHeader('Content-Type','application/json');

  res.json({

    status:'You are Successfully logged in',
    token:token,
    success:true

  });

});

router.get("/logout",cors.corsOptions,(res,req,next)=>{
  if(req.session){

    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
    
  }
  else{
    var err = new Error('you are not logged in!');
    err.status = 403;
    next(err);

  }
})
router.get('/facebook/token',passport.authenticate('facebook-token'),(req,res)=>{
  if(req.user){
    var token = authenticate.getToken({_id:req.user._id});
    res.statusCode = 200;

    res.setHeader('Content-Type','application/json');
  
    res.json({
  
      status:'You are Successfully logged in',
      token:token,
      success:true
  
    });
  }
})
module.exports = router;
