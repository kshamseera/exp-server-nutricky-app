const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const calorieRouter = require('./routes/calorie_routes');
// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.port || 3030;

// Equivalant of create server in http library
const app = express();

// Call the middleware we want to use
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
// app.use(morgan("combined"));

// set up the db connection

const dbConn = "mongodb://localhost/nutricky_app"

mongoose.connect(

	dbConn,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	},
	err => {
		if (err) {
			console.log("Error connecting to database", err)
		} else {
			console.log("Connected to database!")
		}
	}
)

app.get("/", (req, res) =>{
    console.log("get on /");
    res.send("got your request");
})


app.use("/calories", calorieRouter);

// Define a simple route for GET
app.get("/",(req,res) => {
    res.send("Hi from your Express Server. From past you. You are awesome.")
});

// Listen
app.listen(port, () => console.log(`Listening on port ${port}.`));