const {Service} = require("../model/model")
const fs = require("fs");

const ServiceController = {
    addService : async (req,res)=>{
        try {

            console.log(req.body.name)
            console.log(req.file)
            service = {
                name:req.body.name,
                photo:req.file.filename
            }
            const newService = new Service(service)
            const saveService = await newService.save()
            res.status(200).json(saveService)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllServices : async (req,res)=>{
        try {
            const services = await Service.find({ isDelete: false })
            res.status(200).json(services)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteServices: async (req, res) => {
        try {
            console.log( req.body)
          fs.unlinkSync("images/services/" + req.body.photo);
          const deleteService = await Service.findByIdAndUpdate(
            { _id: req.params.id },
            { isDelete: true }
          );
    
          res.status(200).json();
        } catch (error) {
          res.status(500).json(error);
        }
      },
    
}

module.exports = ServiceController