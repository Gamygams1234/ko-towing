const express = require('express')
const router = express.Router()

const Company = require('../models/Company')
const Order = require('../models/Order')




router.get("/create/", (req, res)=>{

    Company.find({}, (error, allCompanies)=>{
   
        res.render("createOrder.ejs", {companies: allCompanies})
    })

})

router.post("/create/", (req, res)=>{

   console.log(req.body)

   if (req.body.nightShift === "on"){
    req.body.nightShift = true;
   }
   req.body.plate = req.body.plate.toUpperCase();
   Order.create(req.body, (err, order)=>{
    console.log(order)
    res.redirect("/")
   })
   

})

router.get("/active/",(req, res)=>{
    Order.find({paid: false}).populate("company").exec((err,data)=>{
    res.render("activeOrders.ejs", {orders: data})
    })
})


router.post("/find/",(req, res)=>{
 
    Order.find({ vin:req.body.search }).populate("company").exec((err,data)=>{
        console.log(data)
        res.render("search.ejs", {orders: data})
    })
})

router.get("/edit/:id", (req, res)=>{
    let id = req.params.id
    Order.find({_id:id}).populate("company").exec((err,data)=>{
        let currentOrder = data[0];
        // res.render("editOrder.ejs", {currentOrder})
        Company.find({}, (error, allCompanies)=>{
   
            res.render("editOrder.ejs", {currentOrder, companies: allCompanies})
        })
    
     
     })
})

router.put("/edit/:id", (req, res)=>{
    let id = req.params.id
    Order.findOneAndUpdate({_id:id}, req.body, (err,data)=>{
    
    res.redirect("/")
     
     })
})


router.put("/pay/:id", (req, res)=>{
    let currentDay = new Date()
    currentDay.setHours(currentDay.getHours() - 8);
    const id = req.params.id;
    Order.find({_id:id}).populate("company").exec((err,data)=>{
       let currentOrder = data[0];
       
       Order.findOneAndUpdate({_id: currentOrder._id}, {paid: true, releaseDay: currentDay, price:((Math.floor((new Date() - new Date(currentOrder.pickUpDay)) / (1000 * 3600 * 24)) * currentOrder.company.dayPrice) +  currentOrder.company.servicePrice + currentOrder.company.pickUpFee +  currentOrder.additionalFees ) }, (err, order)=>{
        console.log(order)
        res.redirect("/orders/"+ id)
       })
    })
    

})


router.put("/delete/:id", (req,res)=>{
    Order.findOneAndUpdate({ _id: req.params.id } , {hidden: true} , (err, company) => {
        if (err) {
            console.log(err.message);
          } else {

            res.redirect("/")
          }

    })
})

router.get("/:id", (req, res)=>{
    let currentDay = new Date()
    currentDay.setHours(currentDay.getHours() - 8);
    Order.find({_id: req.params.id}).populate("company").exec((err,data)=>{
        if (err){
            res.render("notFound.ejs")
        }else{
            res.render("singleOrder.ejs", {order: data[0], currentDay})
        }
    
    })
})
   
module.exports = router;