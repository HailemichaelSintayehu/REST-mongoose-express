const express = require('express');

const bodyParser = require('body-parser');

const authenticate = require('../authenticate');

const multer = require('multer');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename: (req,file,cb) =>{
        cb(null,file.originalname)
    }
});

const imageFileFilter = (req,file,cb)=>{

    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('you can upload only image files!'))
    }
    cb(null,true);
};

const upload = multer({storage:storage,fileFilter:imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')

.get(authenticate.verifyUser,(req,res,next)=>{

    // res.statusCode = 403; //operation not supported

    res.status(403).end("Get operation not supported on /imageUpload");

})
.post(authenticate.verifyUser,upload.single('imageFile'),(req,res)=>{

    res.statusCode = 200;
    res.setHeader("Content-Type","application/json");
    res.json(req.file);
    
})
.put(authenticate.verifyUser,(req,res,next)=>{

    // res.statusCode = 403; //operation not supported

    res.status(403).end("put operation not supported on /imageUpload");

})

.delete(authenticate.verifyUser,(req,res,next)=>{

    // res.statusCode = 403; //operation not supported

    res.status(403).end("Delete operation not supported on /imageUpload");

});


module.exports = uploadRouter;