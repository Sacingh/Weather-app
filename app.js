const express = require("express");
const bodyParser = require("body-parser");
const https = require('node:https');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res)=>{
    var city = req.body.city;
    console.log(city);
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ce9234998065abd136041639bd2a6899&units=metric";

    https.get(url, (response)=>{
        response.on("data", (data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);

            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);

            const icon = weatherData.weather[0].icon;

            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1> The temperature in Patna is : " + temp + " degrees celcius.</h1>")
            res.write("<p>The weather is a bit : " + weatherDescription + "<p>");
            res.write("<img src =" + imgURL + ">")
            res.send();
        });

    });
});



// app.get("/", (req,res) =>{
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=Patna&appid=ce9234998065abd136041639bd2a6899&units=metric";

//     https.get(url, (response)=>{
//         // console.log(response.statusCode);

//         response.on("data", (data)=>{
//             // console.log(data);

//             const weatherData = JSON.parse(data);
//             // console.log(weatherData);


//             const temp = weatherData.main.temp;
//             console.log(temp);

//             const weatherDescription = weatherData.weather[0].description;
//             console.log(weatherDescription);

//             // const objects = {
//             //     name : "Sachin",
//             //     age : "21",
//             //     City : "Patna"
//             // };

//             // console.log(JSON.stringify(objects));


//             const icon = weatherData.weather[0].icon;

//             const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
//             res.write("<h1> The temperature in Patna is : " + temp + " degrees celcius.</h1>")
//             res.write("<p>The weather is a bit : " + weatherDescription + "<p>");
//             res.write("<img src =" + imgURL + ">")
//             res.send();
//         })

        
//     });

//     // res.send("Server is running");

// });


app.listen(port, ()=>{
    console.log("App is running on port : 3000");
});
