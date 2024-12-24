const Schema=require('mongoose');
const notesSchema=new Schema({
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
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})
const notesModel=Schema.model('note',notesSchema);
module.exports=notesModel;