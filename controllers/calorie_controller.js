const{getAllCalories, getCalorieById, totalCalories, addCalorie, updateCalorie, deleteCalorie} = require("../utils/calories_utilities");
const Calorie = require('../models/calorie');

const getCalories = function(req,res){
    if(req.query.date){
        return totalCalories(req,res);
    }
    if(req.query.user){
        Calorie.findByUser(req.query.user).exec((err,calories) =>{

            if(err) {
                res.status(500);
                return res.json({
                    error: err.message
                });
            }
            // console.log("user query")
           return res.send(calories);

        });
    }

    else{
      //execute the query from getAllCalories
    getAllCalories(req).exec((err, calories) =>{
        if(err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.send(calories);
    });  
    }  
};

const getCalorie = function(req, res){
    //execute the query from getCalorieById
    getCalorieById(req.params.id).exec((err, calorie) => {
        if(err || !calorie) {
            req.status(400);
            return res.send("No details found");
        }
        res.send(calorie)
    })
}

const makeCalorieDetails = function (req, res){
    //execute the query from addCalorie
    addCalorie(req).save((err, calorie) => {
        
        if (err) {
            res.status(500);
            return res.json({
                error :err.message
            });
        }
        res.status(201);
        res.send(calorie);
    });
};

const changeCalorie = function (req, res){
    //execute the query from addCalorie
    console.log("change" , req.body)
    updateCalorie(req).exec((err, calorie) => {
        if(err || !calorie){
            req.status(400);
            return res.send("No Calorie details found!");
        }
        res.status(200);
        res.send(calorie);

    })

}

const removeCalorie = function(req,res){

   //execute the query from deleteCalorie
   deleteCalorie(req.params.id).exec(err =>{
       if(err) {
           req.message = err.message;
           return res.send("No Details Found");
       }
       res.status(204);
       res.send("Deleted Successfully")
   })
}



module.exports = {
    getCalories,
    makeCalorieDetails,
    getCalorie,
    changeCalorie,
    removeCalorie
}