const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

const connection = async () => {
	try {
		await mongoose.connect('mongodb+srv://deborah:<password>@cluster0.lw9pg.mongodb.net/faithcho?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('Connected to DB!');
	} catch (err) {
		console.log(err);
	}
};

connection();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

const photoSchema = new mongoose.Schema({
	name: String,
	url: String,
});

const Photo = mongoose.model("Photo", photoSchema);

const designSchema = new mongoose.Schema({
	name: String,
	url: String,
	description: String,
});

const Design = mongoose.model("Design", designSchema);

app.get('/', (req, res) => {
	res.render('main');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/photography', async (req, res) => {
	try {
		let photos = await Photo.find({});
		res.render('photography', {photos: photos});
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
});

app.get('/design', async (req, res) => {
	try {
		let designs = await Design.find({});
		res.render('design', {designs: designs});
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
});

app.get('/design/:id', async (req, res) => {
    try {
    	let foundDesign = await Design.findById(req.params.id);
    	res.render('showdesign', {design: foundDesign});
    } catch (err) {
    	console.log(err);
    	res.redirect('/design');
    }
});

app.get('/writing', (req, res) => {
	res.render('writing');
});

app.get('/contact', (req, res) => {
	res.render('contact');
});

app.get('*', (req, res) => {
	res.send('PAGE NOT FOUND');
});

app.listen(3000, () => {
	console.log('Running on Port 3000');
});