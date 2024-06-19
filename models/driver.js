const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name_of_driver:{
        type: String,
        required: true
    },
    contact_no:{
        type: Number,
        required:true,
    },
    sfi_no:{
        type:String,
        required:true,
    },
    vehicle_no:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Driver',profileSchema);
