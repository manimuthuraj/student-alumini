const mongoose = require('mongoose');
let mongourl = "mongodb+srv://yelp:yelp@cluster0-lfy4s.mongodb.net/yelp?retryWrites=true&w=majority"

//Connecting to database
mongoose.connect(mongourl, { useNewUrlParser: true ,useUnifiedTopology: true})

mongoose.connection.on("error", function(err) {
    console.log(err)
})