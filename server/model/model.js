const mongoose = require("mongoose");

const departSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  pricePromotion: {
    type: String,
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
  bedroom :{
    type: Number,
    require: true,
  },
  bathroom :{
    type: Number,
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
  anotherMoney:{
    type: String,
    require: true,
  },
  depositMoney: {
    type: String,
    require: true,
  },
  electricMoney: {
    type: String,
    require: true,
  },
  waterMoney: {
    type: String,
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

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    require:true,
  },
  photo:{
    type: String,
    require:true,
  }
})

const ultilitiesDepartSchema = new mongoose.Schema({
  name: {
    type: String,
    require:true,
  },
  photo:{
    type: String,
    require:true,
  }
})

const ultilitiesHomeSchema = new mongoose.Schema({
  name: {
    type: String,
    require:true,
  },
  photo:{
    type: String,
    require:true,
  }
})

let Depart = mongoose.model("Depart", departSchema);
let Form = mongoose.model("Form", formSchema);
let Service = mongoose.model("Service", serviceSchema);
let ultilitiesDepart = mongoose.model("ultilitiesDepart",ultilitiesDepartSchema)
let ultilitiesHome = mongoose.model("ultilitiesHome",ultilitiesHomeSchema)


module.exports = { Depart, Form, Service,ultilitiesDepart,ultilitiesHome };
