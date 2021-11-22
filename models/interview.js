const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    candidateID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate"
    },
    interviewerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interviewer"
    },
    Date:{
        type: Date
    },
    startTime:{
        type: String
    },
    endTime:{
        type: String
    }
});

module.exports = mongoose.model("Interview", interviewSchema);