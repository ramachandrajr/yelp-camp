var express = require("express"), 
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

// Set view engine.
app.set("view engine", "ejs");

// Connecting to mongoose.
mongoose.connect("mongodb://localhost/yelp_camp");

// ****** MIDDLEWARE ******
// Also serve public folder.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// SCHEMAS
var campgroundSchema = mongoose.Schema({
	name: String,
	img: String,
	description: String
});

// MODELS
var Campground = mongoose.model("Campground", campgroundSchema);


// Chimpy way to create a campground.
/*
Campground.create({
	name: "Bitch Ground",
	img: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
	description: "Just a hot bitch ground nothing else. Getting hot bitches and fuck 'em nothing else."
}, function (err, newlyAddedCampground) {
	if (err) {
		console.log(err);
	} else {
		console.log("CREATED A NEW CAMPGROUND:");
		console.log(JSON.stringify(newlyAddedCampground));
	}
});
*/

// Root route.
app.get("/", function (req, res) {
	res.render("landing");
});	

// INDEX - Show all camp grounds.
app.get("/campgrounds", function (req, res) {
	// Get all campgrounds from database.
	Campground.find({}, function (err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
});

// CREATE - Create a new campground in the db.
app.post("/campgrounds", function (req, res) {
	var campName = req.body.campName;
	var imgURL = req.body.imgURL;
	var desc = req.body.desc;
	// Forming new campground object.
	var newCampground = {name: campName, img: imgURL, description: desc};
	// Creating a new campground and adding to DB.
	Campground.create(newCampground, function (err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			// redirect back to our campgrounds array showing page.
			res.redirect("/campgrounds");		
		}
	});
});


// NEW - Shows form to create a new Campground.
app.get("/campgrounds/new", function (req, res) {
	res.render("new");
});


// SHOW - Shows info about one camp ground.
app.get("/campgrounds/:id", function (req, res) {
	// Find campground with provided id.
	Campground.findById(req.params.id, function (err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			// Render show template with that campground.
			res.render("show", {campground: foundCampground});
		}
	});
});

// Listen to the server.
app.listen("3000", function () {
	console.log("The yelpCamp server has started!");
});
