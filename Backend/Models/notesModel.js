const mongoose=require('mongoose');
const notesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})
const notesModel=mongoose.model('note',notesSchema);
module.exports=notesModel;