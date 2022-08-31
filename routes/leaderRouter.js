const express = require('express');

const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain'); 
    console.log("app.all route");
    next();
})

.get((req,res)=>{
    res.end('Will send all the leaders to you!');
})

.post((req,res,next)=>{
    res.end("Will add the leader: ",req.body.name + 'with details' + req.body.description);
    
})
.put((req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Put operation not supported on /leaders");

})

.delete((req,res,next)=>{
    res.end("Delete request delete the leaders");
});

leaderRouter.route('/:leaderId')

.get((req,res)=>{
    res.end('Will send details of the leader!' + req.params.leaderId + 'to you');
})

.post((req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Post operation not supported on /leaders/" + req.params.leaderId);
})
.put((req,res,next)=>{

    res.write("updating the dish: " + req.params.leaderId + "\n");
    res.end("Will update the dish:" + req.body.name + "with details: " + req.body.description)

})
.delete((req,res,next)=>{
    res.end(req.params.leaderId + "deleted from the dish list");
});

module.exports = leaderRouter;
