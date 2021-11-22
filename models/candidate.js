const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String
    },
    resume:{
        type: String
    }
});

module.exports = mongoose.model("Candidate", candidateSchema);