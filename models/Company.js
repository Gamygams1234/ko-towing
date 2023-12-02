const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    name:  { type: String, required: true },
    // 295 for others and 285 for KO
    servicePrice:  { type: Number, required: true },
        // 95 for others and 85 for KO
    dayPrice:  { type: Number, required: true },
    // 150 for all of the companyies
    pickUpFee: {type: Number, required: true},
    // this will determind wether we can see the data
    hidden: {type: Boolean, required: true, default: false}
});


const Company = mongoose.model('Company', companySchema);

module.exports = Company;