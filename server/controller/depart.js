const { Depart, Form } = require("../model/model");
const fs = require("fs");
const { Console } = require("console");

const DepartController = {
  addDepart: async (req, res) => {
    try {
      const name = req.body.name;
      const price = req.body.price;
      const pricePromotion = req.body.pricePromotion;
      const description = req.body.description;
      const type = req.body.type;
      const width = req.body.width;
      const length = req.body.length;
      const status = req.body.status;
      const bedroom = req.body.bedroom;
      const bathroom = req.body.bathroom;
      const anotherMoney = req.body.anotherMoney;

      const depositMoney = req.body.depositMoney;
      const electricMoney = req.body.electricMoney;
      const waterMoney = req.body.waterMoney;
      const nameHouse = req.body.nameHouse;
      const descriptionHouse = req.body.descriptionHouse;
      const districtHouse = req.body.districtHouse;
      const addressHouse = req.body.addressHouse;
      const service = req.body.service;
      const ultilitiesDepart = req.body.ultilitiesDepart;
      const ultilitiesHouse = req.body.ultilitiesHouse;

      const photo = [];
      for (let i = 0; i < req.files.length; i++) {
        photo.push(req.files[i].filename);
      }
      const newDepartData = {
        name,
        price,
        pricePromotion,
        description,
        type,
        width,
        length,
        status,
        bedroom,
        bathroom,
        anotherMoney,
        depositMoney,
        electricMoney,
        waterMoney,
        nameHouse,
        descriptionHouse,
        districtHouse,
        addressHouse,
        photo,
        service,
        ultilitiesDepart,
        ultilitiesHouse,
      };
      const newDepart = new Depart(newDepartData);
      const saveDepart = await newDepart.save();
      res.status(200).json(saveDepart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllDepart: async (req, res) => {
    try {
      const allDeaprt = await Depart.find();
      res.status(200).json(allDeaprt);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateDepart: async (req, res) => {
    try {
      const departUpdate = await Depart.findById(req.params.id);
      await departUpdate.updateOne({ $set: req.body });
      const departUpdateAfter = await Depart.findById(req.params.id);

      res.status(200).json(departUpdateAfter);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateImage: async (req, res) => {
    try {
      const photo = [];
      for (let i = 0; i < req.files.length; i++) {
        photo.push(req.files[i].filename);
      }

       await Depart.updateOne(
        { _id: req.params.id },
        { $push: { photo: photo } }
      );

      const departFinal = await Depart.findById( req.params.id);


      res.status(200).json(departFinal);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteImage: async (req, res) => {
    try {
      fs.unlinkSync("images/departs/" + req.body.photo);
       await Depart.updateOne(
        { _id: req.params.id },
        { $pull: { photo: req.body.photo } }
      );

      const departFinal = await Depart.findById( req.params.id);

  
      res.status(200).json(departFinal);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteDepart: async (req, res) => {
    try {
      // req.body.forEach((element) => {
      //   fs.unlinkSync("images/departs/" + element);
      // });
      const departDelete = await Depart.findByIdAndUpdate(
        { _id: req.params.id },
        { isDelete: req.body.isDelete === true ? false : true }
      );

      res.status(200).json(departDelete);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getDepartDetail: async (req, res) => {
    try {
      const depart = await Depart.findById(req.params.id);
     
      res.status(200).json(depart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = DepartController;
