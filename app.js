const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const ejs = require('ejs');

require('dotenv').config();





const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));




app.get('/',function(req, res){
	res.render('index.ejs');
});


app.post('/',function(req, res){

	const cityName = req.body.cityName;
	const apiKey = process.env.API_KEY;
	const unit = 'metric';


	// getting URL and setting this up to get weather data.

	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + '&appid=' + apiKey + '&units=' + unit;

	https.get(url,function(response){

		response.on('data',function(data){
			const weatherData = JSON.parse(data);
			
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imgURL = 'http://openweathermap.org/img/wn/'+ icon +'@2x.png';




			res.render("weatherData",{
				cityNam:cityName, 
				des:description,
				url: imgURL,
				t: temp
			});

		});
	});

});




app.listen(3000,function(){
	console.log('server is running on port 3000');
});

