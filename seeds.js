const mongoose = require("mongoose");
const Candidate = require("./models/candidate");
const Interviewer = require("./models/interviewer");

const newCan = [
    {name: "Saurabh Krishan", email: "saurabh.krishan9@gmail.com", phone: "7011398972", resume: "https://drive.google.com/file/d/1S7K1BN7ytVUSSTTslUsHmTt3d7HDqkq9/view?usp=sharing" },
    {name: "Heetesh Kumar", email: "heeteshkumar1@outlook.com", phone: "8010681045", resume: "https://drive.google.com/file/d/1S7K1BN7ytVUSSTTslUsHmTt3d7HDqkq9/view?usp=sharing" },
    {name: "Shashank Arora", email: "shashankarora7@outlook.com", phone: "9560324575", resume: "https://drive.google.com/file/d/1S7K1BN7ytVUSSTTslUsHmTt3d7HDqkq9/view?usp=sharing" },
    {name: "Hritik Tyagi", email: "hritiktyagi1@outlook.com", phone: "9717165624", resume: "https://drive.google.com/file/d/1S7K1BN7ytVUSSTTslUsHmTt3d7HDqkq9/view?usp=sharing" }
]
const newIn = [
    {name: "Ajay Kumar", email: "ajaykumar@gmail.com", phone: "9956431284"},
    {name: "Vishal Babani", email: "vishalbabani@gmail.com", phone: "90435892593"},
    {name: "Dushyant Pratap", email: "dushyantpratap@gmail.com", phone: "8518046836"},
    {name: "Utkarsh Verma", email: "utkarshverma@gmail.com", phone: "7034174290"}
]

function seedDB(){
    Candidate.find({}, (err, candidates)=>{
        if(err){
            console.log(err);
        }
        else{
            if(candidates.length === 0){
                newCan.forEach((can)=>{
                    Candidate.create(new Candidate(can), (err, candidate)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Created New Candidate");
                        }
                    })
                });
            }
        }
    });
    Interviewer.find({}, (err, interviewers)=>{
        if(err){
            console.log(err);
        }
        else{
            if(interviewers.length === 0){
                newIn.forEach((x)=>{
                    Interviewer.create(new Interviewer(x), (err, interview)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Created New Interviewer");
                        }
                    })
                });
            }
        }
    });
}

module.exports = seedDB;