const UserModel = require("../Model/UserModel");
const CategoryModel = require("../Model/AddCategoryModel");
const SubjectModel = require('../Model/SubjectModel');
const ChapterModel = require('../Model/ChapterModel');
const crypt = require("bcrypt");
exports.register = async (req, res) => {
  const body = req.body;

  const user = await UserModel.findOne({ email: body.email });
  console.log(user);
  if (user) {
    return res.json({ message: "User already exists" });
  } else {
    if (
      !body.name ||
      !body.email ||
      !body.password ||
      !body.dob ||
      !body.gender ||
      !body.phone ||
      !body.address
    ) {
      return res.json({ message: "All Fields are Required" });
    } else {
      const password = await crypt.hash(body.password, 10);
      const user = await UserModel.create({
        name: body.name,
        email: body.email,
        password: password,
        dob: body.dob,
        gender: body.gender,
        address: body.address,
        phone: body.phone,
      });
      if (user) {
        return res.json({ message: "User Created Successfully" });
      } else {
        return res.json({ message: "Something Went Wrong" });
      }
    }
  }
};

exports.login = async (req, res) => {
  const body = req.body;
  if (!body || !body.email || !body.password) {
    return res.json({ message: "email and password is required" });
  } else {
    const user = await UserModel.findOne({ email: body.email });
    if (!user) {
      return res.json({ message: "invalid Credentials" });
    } else {
      const isMatch = await crypt.compare(body.password, user.password);
      if (!isMatch) {
        return res.json({ message: "invalid password" });
      } else {
        return res.json({
          message: "logged in successfully",
          role: user.role,
          name: user.name,
          id: user._id,
          email: user.email,
        });
      }
    }
  }
};

exports.addCategory = async (req, res) => {
  await CategoryModel.create({
    categoryName: req.body.categoryName,
  });
  return res.json({ message: "Category Created. " });
};

exports.fetchCategory = async (req, res) => {
  let category = await CategoryModel.find();
  return res.json(category);
};

exports.singleCategory = async (req, res) => {
  const id = req.params.id;
  let category = await CategoryModel.findById(id);
  return res.json(category);
};

exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  const body = req.params.body;
  const uc = await CategoryModel.findByIdAndUpdate(id, {
    categoryName: req.body.categoryName,
  });
  return res.json({ message: "Category Updated. " });
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  await CategoryModel.findByIdAndDelete(id);
  return res.json({ message: "Category Deleted. " });
};

exports.addSubject = async (req, res) => {
  try {
    const { subjectName, price, description, trainer, category } = req.body;
    const thumbnail = req.file ? req.file.filename : null;
    if (!subjectName || !price || !description || !trainer || !category || !thumbnail) {
      return res.status(400).json({ message: "All Fields are Required, including an image." });
    }
    const newSubject = new SubjectModel({
      subjectName,
      price,
      description,
      thumbnail,
      trainer,
      trainer,
      category: JSON.parse(category)

    });

    const saved = await newSubject.save();
    res.status(202).json({ message: "Subject added successfully", data: saved });
  } catch (error) {
    res.status(201).json({ message: "Server error", error: error.message });
  }
}

exports.fetchSubject = async (req, res) => {
  const subjects = await SubjectModel.find();
  return res.json(subjects);
}

exports.updateSubject = async (req, res) => {
  try {
    const id = req.params.id;
    const { subjectName, price, description, trainer } = req.body;
    const thumbnail = req.file ? req.file.filename : null; // if you handle image update too

    const updateData = {
      subjectName,
      price,
      description,
      trainer
    };

    if (thumbnail) {
      updateData.thumbnail = thumbnail; // only overwrite if new image uploaded
    }

    const updatedSubject = await SubjectModel.findByIdAndUpdate(id, updateData, {
      new: true
    });

    if (!updatedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.json({ message: "Subject updated", data: updatedSubject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await SubjectModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.json({ message: "Subject deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.singleSubject = async (req, res) => {
  const id = req.params.id;
  const subject = await SubjectModel.findById(id);
  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }
  return res.json(subject);
};


exports.addChapter = async (req, res) => {
  try {
    const { ChapterName, ChapterDescription, SubjectId } = req.body;
    const ChapterThumbnail = req.files["ChapterThumbnail"]
      ? req.files["ChapterThumbnail"][0].filename
      : null;
    const ChapterVideo = req.files["ChapterVideo"]
      ? req.files["ChapterVideo"][0].filename
      : null;
    if (!ChapterThumbnail || !ChapterVideo) {
      return res.status(400).json({ message: "File upload failed." });
    }
    const newChapter = new ChapterModel({
      ChapterName,
      ChapterDescription,
      SubjectId,
      ChapterThumbnail,
      ChapterVideo,
    });
    await newChapter.save();
    res.status(201).json({ message: "Chapter added successfully." });
  } catch (err) {
    console.error("Error saving chapter:", err);
    res.status(500).json({ message: "Server error while adding chapter." });
  }
}

exports.fetchChapter=async (req,res)=>{
  const id=req.params.id;
  const chapters=await ChapterModel.find({SubjectId:id});
  return res.json(chapters);
}