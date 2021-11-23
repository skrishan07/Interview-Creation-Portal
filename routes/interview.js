const express = require("express");
const router = express.Router();
const moment = require("moment");
const Candidate = require("../models/candidate");
const Interviewer = require("../models/interviewer");
const Interview = require("../models/interview");
const mailer = require("../mailer");


// INDEX Interview
router.get("/",(req, res)=>{
    Interview.find().populate("interviewerID").populate("candidateID").exec( (err, interviews)=>{
        if(err){
            res.redirect("back");
            console.log(err);
        }else{
            res.render("index", {interviews: interviews});
        }
    })
});

// NEW Interview
router.get("/new",(req, res)=>{
    Candidate.find({}, (err, candidates)=>{
        if(err){
            res.redirect("back");
            console.log(err);
        }else{
            Interviewer.find({}, (err, interviewers)=>{
                if(err){
                    res.redirect("back");
                    console.log(err);
                }else{
                    res.render("new", {candidates: candidates, interviewers: interviewers});
                }
            })
        }
    })
});

// CREATE Interview
router.post("/new", (req, res)=>{
    Interview.find().populate('candidateID').populate('interviewerID').exec( (err, interviews)=>{
        if(err){
            res.redirect("back");
            console.log(err);
        }else{
            let x = validInterview(0, req.body.newIn, interviews, req.body.candidateId, req.body.interviewerId);
            if(x != 0){
                if(x == 1){
                    req.flash('error',"Start time cannot be greater than end time");
                }else if(x == 2){
                    req.flash('error',"Start date cannot be less than today's date");
                }else if(x == 3){
                    req.flash('error',"Another interview is scheduled at the given time");
                }
                res.redirect("/interview/new");
            }else{
                Interview.create(req.body.newIn, (err, interview)=>{
                    if(err){
                        res.redirect("back");
                        console.log(err);
                    }else{
                        interview.candidateID = req.body.candidateId;
                        interview.interviewerID = req.body.interviewerId;
                        interview.save();
                        req.flash('success',"Interview successfully created");
                        Candidate.findById(req.body.candidateId, (err, candidate)=>{
                            if(err){
                                res.redirect("back");
                                console.log(err);
                            }else{
                                let dt = moment(interview.Date).format('LL');
                                mailer(candidate, interview, dt);
                            }
                        })
                        res.redirect("/interview");
                    }
                })
            }
        }
    })
})

// SHOW Interview
router.get("/:id", (req, res)=>{
    Interview.findById(req.params.id).populate("interviewerID").populate("candidateID").exec( (err, interview)=>{
        if(err){
            res.redirect("back");
            console.log(err);
        }else{
            res.render("show", {interview: interview});
        }
    })
})

// EDIT Interview
router.get("/:id/edit", (req, res)=>{
    Interview.findById(req.params.id).populate("interviewerID").populate("candidateID").exec( (err, interview)=>{
        if(err){
            res.redirect("back");
            console.log(err);
        }else{
            Candidate.find({}, (err, candidates)=>{
                if(err){
                    res.redirect("back");
                    console.log(err);
                }else{
                    Interviewer.find({}, (err, interviewers)=>{
                        if(err){
                            res.redirect("back");
                            console.log(err);
                        }else{
                            res.render("edit", {candidates: candidates, interviewers: interviewers, interview: interview});
                        }
                    })
                }
            })
        }
    })
})

// UPDATE Interview
router.put("/:id", (req, res)=>{
    Interview.find().populate('candidateID').populate('interviewerID').exec( (err, interviews)=>{
        if(err){
            res.redirect("back");
            console.log(err);
        }else{
            let x = validInterview(req.body.upId, req.body.upIn, interviews, req.body.upIn.candidateID, req.body.upIn.interviewerID);
            if(x != 0){
                if(x == 1){
                    req.flash('error',"Start time cannot be greater than end time");
                }else if(x == 2){
                    req.flash('error',"Start date cannot be less than today's date");
                }else if(x == 3){
                    req.flash('error',"Another interview is scheduled at the given time");
                }
                res.redirect("/interview/" + req.params.id);
            }else{
                Interview.findByIdAndUpdate(req.params.id, req.body.upIn, (err, updatedInterview)=>{
                    if(err){
                        console.log(err);
                    }else{
                        req.flash('success',"Interview successfully updated");
                        res.redirect("/interview");
                    }
                })
            }
        }
    })
    
})

// DESTROY Interview
router.delete("/:id", (req, res)=>{
    Interview.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            res.redirect("back");
            console.log(err);
        }else{
            req.flash('success',"Interview successfully deleted");
            res.redirect("/interview");
        }
    })
})

function validInterview(Id, newIn, interviews, canId, inId){
    let st = newIn.startTime;
    let et = newIn.endTime;
    let dt = newIn.Date;
    let nw = new Date().toISOString().substr(0, 10);
    if(st > et){
        return 1;
    }else if(nw > dt){
        return 2;
    }
    if(interviews !== null){
        for(let interview of interviews){
            let odt = interview.Date.toISOString().substr(0, 10);
            let ost = interview.startTime;
            let oet = interview.endTime;
            let oid = interview._id.toString();
            if(Id != interview._id && odt === dt && (interview.candidateID._id.equals(canId) || interview.interviewerID._id.equals(inId))){
                if((st <= ost && ost <= et)||(st <= oet && oet <= et)||(st <= ost && oet <= et)||(ost <= st && et <= oet)){
                    return 3;
                }
            }
        }
    }
    return 0;
}

module.exports = router;