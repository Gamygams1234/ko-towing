const express = require('express')
const router = express.Router()

const Company = require('../models/Company')

// ROUTES (I.N.D.U.C.E.S.)

router.get("/", (req, res)=>{
    Company.find({}, (error, allCompanies)=>{
        console.log(allCompanies)
        res.render("company.ejs", {companies: allCompanies})
    })

})

router.get("/update/:id", (req, res)=>{
    const id = req.params.id
    Company.find({_id:id}, (error, company)=>{
  
        res.render("editCompany.ejs", {company: company[0]})
    })

})

router.put("/update/:id", (req, res)=>{
    const id = req.params.id
    req.body.servicePrice = parseInt(req.body.servicePrice)
    req.body.dayPrice = parseInt(req.body.dayPrice)
    req.body.pickUpFee = parseInt(req.body.pickUpFee)
    Company.findOneAndUpdate({ _id: id } , req.body , (err, company) => {
    
        if (err) {
            console.log(err.message);
          } else {

            res.redirect("/companies")
          }

    })

})

router.put("/remove/:id", (req, res)=>{
    const id = req.params.id
    Company.findOneAndUpdate({ _id: id } , {hidden: true} , (err, company) => {
    
        if (err) {
            console.log(err.message);
          } else {

            res.redirect("/companies")
          }

    })

})


router.get("/create", (req, res)=>{

    res.render("createCompany.ejs")
})



router.post("/create", (req, res)=>{
  
    req.body.servicePrice = parseInt(req.body.servicePrice)
    req.body.dayPrice = parseInt(req.body.dayPrice)
    req.body.pickUpFee = parseInt(req.body.pickUpFee)
    Company.create(req.body, (error, created)=>{
        if(error) {
            console.log(error)
            res.send(error)
        } else {
            res.redirect("/companies")
        }

    } )

})



module.exports = router;