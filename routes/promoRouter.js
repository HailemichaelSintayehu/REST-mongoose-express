const express = require('express');

const bodyParser = require('body-parser');

const promoRouter = express.Router();

const Promotions = require('../models/promotions')

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.get( async (req,res)=>{

try {
    const promotion = await Promotions.find({});

    console.log("the value of promotion in get request",promotion);

    res.setHeader('Content-Type','application/json');

    res.status(200).json(promotion);
} catch (error) {
    res.status(404).json(error);
}

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