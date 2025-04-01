const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express();

// Define paths (Ensure templates is OUTSIDE src)
const pub_dir = path.join(__dirname, '../public');  
const viewsPath = path.join(__dirname, '../templates/views');  // Updated
const partialsPath = path.join(__dirname, '../templates/partials');  // Updated

// Debugging path issues
console.log("Views directory:", viewsPath);

// Set up Handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Serve static filesx
app.use(express.static(pub_dir));

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Serene-Skies',
        name: 'Nikhil Manne'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({ 
        error :'please provide a address'
       })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        if (!data || !data.latitude || !data.longitude) {
            return res.send({ error: "Unable to find location. Try another search!" });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            });
        });
    });
    
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nikhil Manne'
    });
});

app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'Help Page',
        message: 'How can we assist you?',
        name: 'Nikhil Manne'
    });
});

app.get('*', (req, res) => {
    res.render("404", {
        title: "404!",
        name: "Nikhil Manne",
        errormessage: "Page not found",
        homeLink: '<a href="/">Go back home</a>'
    });
});

// Start server
app.listen(7000, () => {
    console.log("Server is running on port 7000");
});
