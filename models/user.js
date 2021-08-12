const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

var fuserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role:{type:String, enum:["student","alumini"], default:"student"},
    created_date: {
        type: Date,
        default: Date.now
    },
})
fuserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("fuser", fuserSchema)