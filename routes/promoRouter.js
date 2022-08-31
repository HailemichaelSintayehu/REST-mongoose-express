const express = require('express');

const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain'); 
    console.log("app.all route");
    next();
})

.get((req,res)=>{
    res.end('Will send all the promotions to you!');
})

.post((req,res,next)=>{
    res.end("Will add the promotion: ",req.body.name + 'with details' + req.body.description);
    
})
.put((req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Put operation not supported on /promotions");

})

.delete((req,res,next)=>{
    res.end("Delete request delete the promotions");
});

promoRouter.route('/:promoId')

.get((req,res)=>{
    res.end('Will send details of the dish!' + req.params.promoId + 'to you');
})

.post((req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Post operation not supported on /dishes/" + req.params.promoId);
})
.put((req,res,next)=>{

    res.write("updating the dish: " + req.params.promoId + "\n");
    res.end("Will update the dish:" + req.body.name + "with details: " + req.body.description)

})
.delete((req,res,next)=>{
    res.end(req.params.promoId + "deleted from the dish list");
});

module.exports = promoRouter;