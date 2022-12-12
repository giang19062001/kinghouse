const {ultilitiesHome,Depart} = require("../model/model")
const fs = require("fs");

const UlHomeController = {
    addUlHome : async (req,res)=>{
        try {

            console.log(req.body.name)
            console.log(req.file)
            ulHome = {
                name:req.body.name,
                photo:req.file.filename
            }
            const newUlHome = new ultilitiesHome(ulHome)
            const saveUlHome = await newUlHome.save()
            res.status(200).json(saveUlHome)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllUlHome : async (req,res)=>{
        try {
            const ulHomes = await ultilitiesHome.find()
            res.status(200).json(ulHomes)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteUlHome: async (req, res) => {
        try {
          fs.unlinkSync("images/ulHome/" + req.body.photo);
          await Depart.updateMany({ $pull: { ultilitiesHouse: req.body.name } });

          const ulHomeDelete = await ultilitiesHome.findByIdAndDelete(req.params.id );
    
          res.status(200).json();
        } catch (error) {
          res.status(500).json(error);
        }
      },
    
}

module.exports = UlHomeController