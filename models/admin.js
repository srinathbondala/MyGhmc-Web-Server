const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name_of_admin:{
        type: String,
        required: true
    },
    contact_no:{
        type: Number,
        required:true,
    },
    emp_id:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Admin',profileSchema);
