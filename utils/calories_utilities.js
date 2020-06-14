const Calorie = require('../models/calorie');

const getAllCalories = function (req){
   
    return Calorie.find();
};

//get calorie by id
const getCalorieById = function (id) {
    return Calorie.findById(id);
};

const totalCalories = function(req,res){
	let queryDate = new Date(req.query.date);
    Calorie.findByUser(req.query.user).exec((err, calories) => {
        if(err){
            res.status(500);
            return res.send(err.message);
        }
        if(calories.length===0){
            res.status(400);
            return res.send("No Data Found");
		}
		let calorie = calories.find((calorie) => {
			let date = calorie.create_date
			return (date.getMonth() === queryDate.getMonth()
					&& date.getDate() === queryDate.getDate()
					&& date.getFullYear() === queryDate.getFullYear())
		})
		if(!calorie) {
            res.status(400);
            return res.send("No Data Found");
        }
        const goal = calorie.calorie_goal;
        const bfCalorie = calorie.calorie_amount_bf;
        const lunchCalorie = calorie.calorie_amount_lunch;
        const dinnerCalorie = calorie.calorie_amount_dinner;
        const calorieTotal = bfCalorie + lunchCalorie + dinnerCalorie;
        const calorieDiff = goal - calorieTotal;
        const response = {
            goal: goal,
            total: calorieTotal,
            difference: calorieDiff
        }
        res.send(response);
        
    })
};

const addCalorie = function(req){
    let date = Date.now();
    req.body.create_date = date;
    req.body.modified_date = date;
    return new Calorie (req.body); 
};

const updateCalorie = function(req){
    req.body.modified_date = Date.now();
    // console.log("update", req.body)
    return Calorie.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    });
};
 
const deleteCalorie = function(id){
    return Calorie.findOneAndDelete(id);
}

module.exports = {getAllCalories, getCalorieById, totalCalories, addCalorie, updateCalorie, deleteCalorie};