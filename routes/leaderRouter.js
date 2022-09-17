const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const authenticate = require('../authenticate');

const cors = require('./cors');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

const Leaders = require('../models/leaders');

leaderRouter.route('/')
.options(cors.corsOptions,(req,res) =>{
    res.sendStatus(200);
})

.get(cors.cors, async(req,res)=>{
    try {

        const leaders = await Leaders.find({});   
        
        res.status(200).json(leaders);

    } catch (error) {

        res.status(404).json(error);

    }
})

.post(cors.corsWithOptions,authenticate.verifyUser,async(req,res,next)=>{
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
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Put operation not supported on /leaders");

})

.delete(cors.corsWithOptions,authenticate.verifyUser,async(req,res,next)=>{
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

.options(cors.corsOptions,(req,res) =>{
    res.sendStatus(200);
})

.get(cors.cors,async(req,res)=>{
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

.post(cors.corsOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Post operation not supported on /leaders/" + req.params.leaderId);
})
.put(cors.corsWithOptions,authenticate.verifyUser,async(req,res,next)=>{

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
.delete(cors.corsOptions,authenticate.verifyUser,async(req,res,next)=>{
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
