const exp=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=exp();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    console.log(req.body.cityName);
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=4d5e0ebdb1b523e18afcd05fa6d32b79&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode)

        response.on("data",function(data){
            const we=JSON.parse(data);
            const imgurl=  'http://openweathermap.org/img/wn/'+we.weather[0].icon+'@2x.png ';
            console.log(we);
            var x="Weather report\n";
            res.write(x);
            res.write("\n----------------------------------------");
            res.write("\nThe temperature in "+query+ " is:"+we.main.temp+"C");
            res.write("\nThe feel like temperature in "+query+ " is:"+we.main.feels_like+"C");
            res.write("\nThe minimum temperature in "+query+ " is:"+we.main.temp_min+"C");
            res.write("\nThe maximum temperature in "+query+ " is:"+we.main.temp_max+"C");
            res.write("\nThe pressure in "+query+ " is:"+we.main.pressure);
            res.write("\nThe humidity in "+query+ " is:"+we.main.humidity);
            res.write("\n----------------------------------------");
            res.write("\nWind speed in "+query+" is :"+we.wind.speed);
            res.write("\nClouds in "+query+" is :"+we.clouds.all);
            res.send();
        })
    })        
})

app.listen(3000,function(){
    console.log("server started at 3000")
});