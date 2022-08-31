const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')

.get((req,res)=>{
    Dishes.find({})
    .then((dish)=>{
        res.statusCode =  200;

        res.setHeader('Content-Type','application/json');

        res.json(dish);

    },(err) => next(err))

    .catch((err)=> next(err));

})

.post((req,res,next)=>{
    Dishes.create(req.body)

    .then((dish)=>{
        console.log('Dish created',dish);

        res.statusCode = 200;

        res.setHeader('Content-Type','application/json');

        res.json(dish);

    },(err) => next(err))

    .catch((err)=> next(err));
    
})

.put((req,res,next)=>{
    res.statusCode = 403; //operation not supported

    res.end("Put operation not supported on /dishes");

})

.delete((req,res,next)=>{
    Dishes.remove({})

    .then((resp)=>{

        res.statusCode = 200;

        res.setHeader('Content-Type','application/json');

        res.json(resp);
    },(err) => next(err))

    .catch((err)=> next(err));
    
});

dishRouter.route('/:dishId')

.get((req,res)=>{
    Dishes.findById(req.params.dishId)

    .then((dish)=>{
        res.statusCode =  200;

        res.setHeader('Content-Type','application/json');

        res.json(dish);

    },(err) => next(err))

    .catch((err)=> next(err));

})

.post((req,res,next)=>{
    res.statusCode = 403; //operation not supported

    res.end("Post operation not supported on /dishes/" + req.params.dishId);

})
.put((req,res,next)=>{
    Dishes.findByIdUpdate(req.params.dishId,{
        $set:req.body
    },{new:true})
    .then((dish)=>{
        
        res.statusCode = 200;

        res.setHeader('Content-Type','application/json');

        res.json(dish);
    })


})
.delete((req,res,next)=>{
    res.end(req.params.dishId + "deleted from the dish list");
});


module.exports = dishRouter;
