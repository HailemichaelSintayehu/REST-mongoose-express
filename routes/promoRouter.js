const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const promoRouter = express.Router();

const Promotions = require('../models/promotions');

const authenticate = require('../authenticate');

const cors = require('./cors');

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.options(cors.corsOptions,(req,res) =>{
    res.sendStatus(200);
})

.get( cors.cors,async (req,res)=>{

try {
    const promotion = await Promotions.find({});

    console.log("the value of promotion in get request",promotion);

    res.status(200).json({

        success:true,
        promotion:promotion
        
});

} catch (error) {

    res.status(400).json(error.message);

}

})

.post(cors.corsOptions,authenticate.verifyUser, async(req,res,next)=>{
   try {
    const promotion = await Promotions.create(req.body);

    console.log("the value of promotion in post request",promotion);

    res.status(200).json({

        success:true,
        promotion:promotion
        
});

   } catch (error) {

    res.status(400).json(error.message)

   }
    
})
.put(cors.corsOptions,authenticate.verifyUser,(req,res,next)=>{

    res.statusCode = 403; //operation not supported

    res.end("Put operation not supported on /promotions");


})

.delete(cors.corsOptions,authenticate.verifyUser,async(req,res,next)=>{

    try {
        
    const promotion = await Promotions.remove({});

    res.status(200).json({

        success:true,
        promotion:promotion
        
});

    } catch (error) {

        res.status(404).json(error.message)
    }


});

promoRouter.route('/:promoId')

.options(cors.corsOptions,(req,res) =>{
    res.sendStatus(200);
})

.get(cors.cors,async(req,res)=>{
    try {

        res.setHeader('Content-Type','application/json');

        const promotion = await Promotions.findById(req.params.promoId);

        res.status(200).json({

            success:true,
            promotion:promotion
            
    });

    } catch (error) {

        res.status(404).json(error.message);
    }


})

.post(cors.corsOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Post operation not supported on /promotions/" + req.params.promoId);
})

.put(cors.corsOptions,authenticate.verifyUser,async(req,res,next)=>{
    try {

        res.setHeader('Content-Type','application/json');

        const promotion = await Promotions.findByIdAndUpdate(req.params.promoId,{

            $set:req.body
    
        },{new:true});  

        res.status(200).json({
            success:true,
            promotion:promotion
            
    });
    } catch (error) {
        res.status(404).json({
            success:false,
            error:error.message
        })
    }

    


})
.delete(cors.corsOptions,authenticate.verifyUser,async(req,res,next)=>{
try {
    const promotion = await Promotions.findByIdAndRemove(req.params.promoId);

    res.status(200).json({

        success:true,
        promotion:promotion
        
})
} catch (error) {
    res.status(404).json({
        success:false,
        error:error.message
    })
}
});

module.exports = promoRouter;    