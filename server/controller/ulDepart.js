const {ultilitiesDepart,Depart} = require("../model/model")
const fs = require("fs");

const UlDepartController = {
    addUlDepart : async (req,res)=>{
        try {

            console.log(req.body.name)
            console.log(req.file)
            ulDepart = {
                name:req.body.name,
                photo:req.file.filename
            }
            const newUlDepart = new ultilitiesDepart(ulDepart)
            const saveUlDepart = await newUlDepart.save()
            res.status(200).json(saveUlDepart)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllUlDepart : async (req,res)=>{
        try {
            const ulDeparts = await ultilitiesDepart.find()
            res.status(200).json(ulDeparts)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteUlDepart: async (req, res) => {
        try {
          fs.unlinkSync("images/ulDepart/" + req.body.photo);
          await Depart.updateMany({ $pull: { ultilitiesDepart: req.body.name } });

          const ulDepartDelete = await ultilitiesDepart.findByIdAndDelete(req.params.id );

          res.status(200).json();
        } catch (error) {
          res.status(500).json(error);
        }
      },
    
}

module.exports = UlDepartController