const mongoose = require("mongoose");

const departSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  width: {
    type: Number,
    require: true,
  },
  length:{
    type: Number,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  service: {
    type: [String],
    require: true,
  },
  ultilitiesDepart: {
    type: [String],
    require: true,
  },
  electricMoney: {
    type: Number,
    require: true,
  },
  waterMoney: {
    type: Number,
    require: true,
  },
  photo: {
    type: [String],
    require: true,
  },
  nameHouse: {
    type: String,
  },
  descriptionHouse: {
    type: String,
  },
  districtHouse: {
    type: String,
    require: true,
  },
  addressHouse: {
    type: String,
    require: true,
  },
  ultilitiesHouse: {
    type: [String],
  },
  isDelete:{
    type:Boolean,
    default:false
    
  }

});

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  note: {
    type: String,
    require: true,
  },
  depart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Depart",
    require:true
  },
},{timestamps:true});

let Depart = mongoose.model("Depart", departSchema);
let Form = mongoose.model("Form", formSchema);

module.exports = { Depart, Form };
