const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const authenticate = require('../authenticate');

const cors = require('./cors');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.options(cors.corsOptions,(req,res) =>{
    res.sendStatus(200);
})
.get(cors.cors,(req,res,next)=>{

    Dishes.find({})

    .populate('comments.author')

    .then((dish)=>{

        res.setHeader('Content-Type','application/json');

        res.status(200).json(dish);

    },(err) => next(err))

    .catch((err)=> next(err));

})

.post(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Dishes.create(req.body)

    .then((dish)=>{

        console.log('Dish created',dish);

        res.setHeader('Content-Type','application/json');

        res.status(200).json(dish);

    },(err) => next(err))

    .catch((err)=> next(err));
    
})

.put(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

    // res.statusCode = 403; //operation not supported

    res.status(403).end("Put operation not supported on /dishes");

})

.delete(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

    Dishes.remove({})

    .then((dish)=>{

        res.setHeader('Content-Type','application/json');

        res.status(200).json(dish);
        
    },(err) => next(err))

    .catch((err)=> next(err));
    
});

dishRouter.route('/:dishId')
.options(cors.corsOptions,(req,res) =>{
    res.sendStatus(200);
})
.get(cors.cors,(req,res,next)=>{

    Dishes.findById(req.params.dishId)

    .populate('comments.author')

    .then((dish)=>{

        res.setHeader('Content-Type','application/json');

        res.status(200).json(dish);

    },(err) => next(err))

    .catch((err)=> next(err));

})

.post(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

    res.statusCode = 403; //operation not supported

    res.end("Post operation not supported on /dishes/" + req.params.dishId);

})
.put(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

    Dishes.findByIdAndUpdate(req.params.dishId,{

        $set:req.body

    },{new:true})

    .then((dish)=>{

        res.setHeader('Content-Type','application/json');

        res.status(200).json(dish);

    },(err)=>next(err))

    .catch((err)=>next(err));


})
.delete(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

    Dishes.findByIdAndRemove(req.params.dishId)

    .then((resp)=>{

        res.setHeader('Content-Type','application/json');

        res.status(200).json(resp);

    },(err) => next(err))

    .catch((err)=> next(err));
});

dishRouter.route('/:dishId/comments')

.options(cors.corsOptions,(req,res) =>{
    res.sendStatus(200);
})
.get(cors.cors,(req,res,next)=>{

    Dishes.findById(req.params.dishId)

    .populate('comments.author')

    .then((dish)=>{
        
        if(dish != null){
            
            res.setHeader('Content-Type','application/json');

            res.status(200).json(dish.comments);
        }
        else{
            err = new Error ('Dish' + req.params.dishId + 'not found');

            err.status = 404;

            return next(err);
        }

    },(err) => next(err))

    .catch((err)=> next(err));

})

.post(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

    Dishes.findById(req.params.dishId)

    .then((dish)=>{

        if(dish != null){
            
            req.body.author = req.user._id;

            dish.comments.push(req.body);

            dish.save()

            .then((dish)=>{

                Dishes.findById(dish._id)

                    .populate('comments.author')

                    .then((dish)=>{

                        res.setHeader('Content-Type','application/json');

                        res.status = 200;
        
                        res.json(dish);
                    })


            },(err) => next(err))
            
        }
        else{
            err = new Error ('Dish' + req.params.dishId + 'not found');

            err.status = 404;

            return next(err);
        };

    },(err) => next(err))

    .catch((err)=> next(err));
    
})

.put(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    // res.statusCode = 403; //operation not supported

    res.status(403).end("Put operation not supported on /dishes/" + req.params.dishId + '/comments');

})

.delete(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Dishes.findById(req.params.dishId)

    .then((dish)=>{
        
        if(dish != null){
            
            for(var i = (dish.comments.length-1);i >= 0;i--){

                dish.comments.id(dish.comments[i]._id).remove();

            }
            dish.save()
             
            .then((dish)=>{

                res.setHeader('Content-Type','application/json');

                res.status = 200 ;

                res.json(dish);

            },(err) => next(err))
        }
        else{
            err = new Error ('Dish' + req.params.dishId + 'not found');

            err.status = 404;

            return next(err);
        }

    },(err) => next(err))

    .catch((err)=> next(err));
    
});

dishRouter.route('/:dishId/comments/:commentId')
.options(cors.corsOptions,(req,res) =>{
    res.sendStatus(200);
})
.get(cors.cors,(req,res,next)=>{

    Dishes.findById(req.params.dishId)

    .populate('comments.author')

    .then((dish)=>{

        if(dish != null && dish.comments.id(req.params.commentId) != null ){

            res.setHeader('Content-Type','application/json');

            res.status(200).json(dish.comments.id(req.params.commentId));
    
        }
        else if (dish == null) {

            err = new Error('Dish' + req.params.dishId + 'not Found');

            err.status = 404;

            return next(err);
            
        }
        else{
            err = new Error('Dish' + req.params.commentId + 'not Found');

            err.status = 404;

            return next(err);

        }

    },(err) => next(err))

    .catch((err)=> next(err));

})

.post(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403; //operation not supported

    res.end("Post operation not supported on /dishes/" + req.params.dishId + 
    '/comments/' + req.params.commentId);

})

.put(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

    Dishes.findById(req.params.dishId)

    .then((dish)=>{

        if(dish != null && dish.comments.id(req.params.commentId) != null ){
            
                if(req.body.rating){

                    dish.comments.id(req.params.commentId).rating = req.body.rating;
                }

                if(req.body.comment){

                    dish.comments.id(req.params.commentId).comment = req.body.comment;
                }
    
                dish.save()
    
                .then((dish)=>{

                    Dishes.findById(dish._id)

                    .populate('comments.author')

                    .then((dish)=>{

                        res.status = 200 ;
    
                        res.setHeader('Content-Type','application/json');
        
                        res.json(dish);
                    })

    
                },(err) => next(err))
    
        }
        else if (dish == null) {

            err = new Error('Dish' + req.params.dishId + 'not Found');

            err.status = 404;

            return next(err);
            
        }
        else{
            err = new Error('Dish' + req.params.commentId + 'not Found');

            err.status = 404;

            return next(err);

        }

    },(err) => next(err))

    .catch((err) => next(err));

})

.delete(cors.corsOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

   Dishes.findById(req.params.dishId)

    .then((dish)=>{
        
        if(dish != null && dish.comments.id(req.params.commentId) != null ){
            
            dish.comments.id(req.params.commentId).remove();

            dish.save()
             
            .then((dish)=>{
                
                Dishes.findById(dish._id)

                .populate('comments.author')

                .then((dish)=>{
                    
                    res.status = 200 ;

                    res.setHeader('Content-Type','application/json');
    
                    res.json(dish);
                })

            },(err) => next(err))
        }
        else if (dish == null) {

            err = new Error('Dish' + req.params.dishId + 'not Found');

            err.status = 404;

            return next(err);
            
        }
        else{
            err = new Error('Comment' + req.params.commentId + 'not Found');

            err.status = 404;

            return next(err);

        }

    },(err) => next(err))

    .catch((err)=> next(err));
});

module.exports = dishRouter;
