const {Form} = require("../model/model")

const FormController = {
    addForm : async (req,res)=>{
        try {

            const newForm = new Form(req.body)
            const saveForm = await newForm.save()
            res.status(200).json(saveForm)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllForm : async (req,res)=>{
        try {
            const forms = await Form.find()
            res.status(200).json(forms)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getFormDetail : async (req,res)=>{
        try {
            const forms = await Form.findById(req.params.id)
            res.status(200).json(forms)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteForm : async (req,res)=>{
        try {
            await Form.findByIdAndDelete(req.params.id)
            res.status(200).json("delete succesfull")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    
}

module.exports = FormController