const mongoose=require('mongoose');
const ChapterSchema=new mongoose.Schema({
  ChapterName:{
    type:String,
    required:true
  },
  ChapterDescription:{
    type:String,
    required:true
  },
  ChapterThumbnail:{
    type:String,
    required:true
  },
  SubjectId:{
    type:String,
    required:true
  },
  ChapterVideo:{
    type:String,
    required:true
  }
})
const ChapterModel=mongoose.model('chapter',ChapterSchema);
module.exports=ChapterModel