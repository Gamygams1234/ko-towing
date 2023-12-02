const mongoose = require("mongoose");
const Company = require("./Company");

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new Schema({
  policyOrder: { type: Number, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  company: { type: ObjectId, ref: "Company" },
  year: {type: Number},
  vin: { type: Number },
  plate: { type: String },
  pickUpDay: { type: Date },
  price: { type: Number },
  additionalFees: { type: Number, default: 0},
  additionalFeesReason: {type: String, default: ""},
  paid: { type: Boolean, default: false },
  releaseDay: { type: Date },
  nightShift: {type: Boolean, default: false},
  hidden: { type: Boolean, default: false },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
