const mongoose=require('mongoose')
const SubjectSchema=new mongoose.Schema({
    subjectName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    trainer:{
        type:String,
        required:true
    },
    category:{
        type:Object,
        required:true
    }
})

const SubjectModel=mongoose.model('subject',SubjectSchema);
module.exports=SubjectModel;