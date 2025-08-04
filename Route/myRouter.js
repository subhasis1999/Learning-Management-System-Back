const express=require('express');
const router=express.Router();
const UserController=require('../Controller/myController');
const upload=require('../middleware/upload');
const chapters=require('../middleware/uploadchapter');
router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.post('/addCategory',UserController.addCategory);
router.get('/fetchCategory',UserController.fetchCategory);
router.get('/singleCategory/:id',UserController.singleCategory);
router.put('/updateCategory/:id',UserController.updateCategory);
router.delete('/deleteCategory/:id',UserController.deleteCategory);

router.post('/addSubject',upload.single('thumbnail'),UserController.addSubject);
router.get('/fetchSubjects',UserController.fetchSubject);
router.put('/updateSubject/:id', UserController.updateSubject);
router.delete('/deleteSubject/:id', UserController.deleteSubject);
router.get('/singleSubject/:id', UserController.singleSubject)

router.post('/addChapter',chapters.fields([
    { name: "ChapterThumbnail", maxCount: 1 },
    { name: "ChapterVideo", maxCount: 1 },
  ]),UserController.addChapter);
router.get('/fetchChapter/:id',UserController.fetchChapter);

module.exports=router