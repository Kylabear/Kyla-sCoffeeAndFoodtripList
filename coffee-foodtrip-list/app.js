const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/coffeeFoodtrip', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database Schema
const placeSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  location: String,
  terminalLocation: String,
  comments: String
});

const Place = mongoose.model('Place', placeSchema);

// Routes
app.get('/', (req, res) => {
  Place.find({}, (err, places) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { places: places });
    }
  });
});

app.post('/add', (req, res) => {
  const newPlace = new Place({
    name: req.body.name,
    rating: req.body.rating,
    location: req.body.location,
    terminalLocation: req.body.terminalLocation,
    comments: req.body.comments
  });

  newPlace.save(err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
