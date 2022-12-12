const { Service, Depart } = require("../model/model");
const fs = require("fs");

const ServiceController = {
  addService: async (req, res) => {
    try {
      console.log(req.body.name);
      console.log(req.file);
      service = {
        name: req.body.name,
        photo: req.file.filename,
      };
      const newService = new Service(service);
      const saveService = await newService.save();
      res.status(200).json(saveService);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllServices: async (req, res) => {
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteServices: async (req, res) => {
    try {
      console.log(req.body);
      fs.unlinkSync("images/services/" + req.body.photo);
      await Depart.updateMany({ $pull: { service: req.body.name } });
      const deleteService = await Service.findByIdAndDelete(req.params.id);

      res.status(200).json();
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ServiceController;
