const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name_of_owner:{
        type: String,
        required: true
    },
    contact_no:{
        type: Number,
        required:true,
    },
    building_name:{
        type:String,
        required:true,
    },
    plot_no:{
        type:String,
        required:true
    },
    total_units:{
        type:Number,
        required:true
    },
    comercial_units:{
        type:Number,
        required:true
    },
    residential_units:{
        type:Number,
        required:true
    },
    zone:{
        type:String,
        required:true
    },
    circle:{
        type:Number,
        required:true
    },
    ward:{
        type:Number,
        required:true
    }
})

module.exports= mongoose.model('Profile',profileSchema);

