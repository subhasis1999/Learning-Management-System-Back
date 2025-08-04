const multer=require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "ChapterThumbnail") {
      cb(null, "chapters/thumbnails");
    } else if (file.fieldname === "ChapterVideo") {
      cb(null, "chapters/videos");
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const chapters = multer({ storage: storage });
module.exports=chapters;