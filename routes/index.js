const express = require("express");
const router = express.Router();

//LANDING
router.get("/",(req, res)=>{
    res.render("landing");
});

//REST OF THE ROUTES
router.get("*",(req, res)=>{
    res.redirect("/");
});

module.exports = router;