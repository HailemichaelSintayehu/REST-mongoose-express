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

    res.status(200).json({

        success:true,
        promotion:promotion
        
});

} catch (error) {

    res.status(400).json(error.message);

}

})

.post( async(req,res,next)=>{
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
.put((req,res,next)=>{

    res.statusCode = 403; //operation not supported

    res.end("Put operation not supported on /promotions");


})

.delete(async(req,res,next)=>{

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

.get(async(req,res)=>{
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

.post((req,res,next)=>{
    res.statusCode = 403; //operation not supported
    res.end("Post operation not supported on /promotions/" + req.params.promoId);
})

.put(async(req,res,next)=>{
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
.delete((req,res,next)=>{
try {
    const promotion = Promotions.findByIdAndRemove(req.params.promoId);

    res.status(200).json({

        success:true,
        promotion:promotion
        
})
} catch (error) {
    
}
});

module.exports = promoRouter;