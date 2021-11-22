const mongoose = require("mongoose");

const interviewerSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    }
});

module.exports = mongoose.model("Interviewer", interviewerSchema);