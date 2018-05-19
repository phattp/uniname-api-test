var express = require("express");
var app = express();
var request = require("request");
var _ = require('underscore');

app.set("view engine", "ejs");

app.use(express.static("css"));

app.get("/", function(req, res){
    
    var url = "http://uinames.com/api/?ext&amount=25";
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);

            var grouped = _.groupBy(data, function(people) {
                var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
                var d = new Date(people.birthday.mdy);
                var dayName = days[d.getDay()];
                return dayName;
            });
            console.log(grouped);
            res.render("index", {grouped: grouped});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("API App has Started!!");
});