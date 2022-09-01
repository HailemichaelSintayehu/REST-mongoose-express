const express = require('express');

const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

const Leaders = require('../models/leaders');

leaderRouter.route('/')

.get( async(req,res)=>{
    try {

        const leaders = await Leaders.find({});   
        
        res.status(200).json(leaders);

    } catch (error) {

        res.status(404).json(error);

    }
})

.post(async(req,res,next)=>{
    try {
        const leaders = await Leaders.create(req.body);
    
        console.log("the value of promotion in post request",leaders);
    
        res.status(200).json({
    
            success:true,
            leaders:leaders
            
    });
    
       } catch (error) {
    
        res.status(400).json(error.message)
    
       }
})
.put((req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Put operation not supported on /leaders");

})

.delete(async(req,res,next)=>{
    try {
        
        const leaders = await Leaders.remove({});
    
        res.status(200).json({
    
            success:true,
            promotion:promotion
            
    });
    
        } catch (error) {
    
            res.status(404).json(error.message)
        }
});

leaderRouter.route('/:leaderId')

.get(async(req,res)=>{
    try {

        res.setHeader('Content-Type','application/json');

        const leaders = await Leaders.findById(req.params.leaderId);

        res.status(200).json({

            success:true,
            promotion:promotion
            
    });

    } catch (error) {

        res.status(404).json(error.message);
    }
})

.post((req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Post operation not supported on /leaders/" + req.params.leaderId);
})
.put(async(req,res,next)=>{

    try {

        res.setHeader('Content-Type','application/json');

        const leaders = await Leaders.findByIdAndUpdate(req.params.leaderId,{

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
.delete(async(req,res,next)=>{
    try {
        const leaders = await Leaders.findByIdAndRemove(req.params.leaderId);
    
        res.status(200).json({
    
            success:true,
            leaders:leaders
            
    })
    } catch (error) {
        res.status(404).json({
            success:false,
            error:error.message
        })
    }
});

module.exports = leaderRouter;
